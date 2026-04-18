import fs from 'fs';
import path from 'path';
import yaml from 'yaml'; // Import our new YAML parser

const RAW_DIR = './src/data/raw';
const OUT_DIR = './src/data';

function capitalize(str: string) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Generate reliable URL-friendly slugs for auto IDs
function slugify(text: string) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '-');
}

// Auto-calculate the fixed Base cost formula for Rituals relying purely on their Circle
function getBaseCost(circulo: number): number {
    if (circulo === 1) return 1;
    if (circulo === 2) return 3;
    if (circulo === 3) return 6;
    if (circulo === 4) return 10;
    return circulo; // Fallback math if ever expanding
}

const masterRituais: any[] = [];
const masterHabilidades: any[] = [];

function scanDir(currentPath: string) {
    if (!fs.existsSync(currentPath)) return;
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        if (entry.isDirectory()) {
            scanDir(fullPath);
        } else if (entry.name.endsWith('.yml')) {
            const relativePath = path.relative(RAW_DIR, fullPath);
            const parts = relativePath.split(path.sep);
            
            if (parts.length >= 2) {
                const grupo = parts[0];
                
                // Read via YAML parser instead of JSON
                const fileRawContent = fs.readFileSync(fullPath, 'utf8');
                const content = yaml.parse(fileRawContent);
                if (!content) continue;
                
                const fileFonte = content.fonte || 'Desconhecido';
                const itensArray = Array.isArray(content) ? content : (content.itens || []);

                itensArray.forEach((item: any) => {
                    // Auto-Inject Group and Source 
                    item.grupo_fonte = capitalize(grupo);
                    item.fonte = fileFonte;
                    
                    // Auto-Inject Deterministic ID Based on Item Name!
                    item.id = slugify(item.nome);
                    
                    if (entry.name.includes('rituais')) {
                        // Auto-Inject the Base version 'custo' dynamically, and absolute costs for everything else!
                        if (item.circulo && item.versoes && item.versoes.length > 0) {
                            const baseCost = getBaseCost(item.circulo);
                            
                            item.versoes.forEach((v: any) => {
                                if (v.tipo === 'Base') {
                                    v.custo = baseCost;
                                } else {
                                    // For Discente/Verdadeira, we calculate absolute from custo_extra
                                    if (v.custo_extra) {
                                        v.custo = baseCost + parseInt(v.custo_extra, 10);
                                        delete v.custo_extra; // Erase from compiled JSON!
                                    }
                                }
                            });
                        }
                        
                        masterRituais.push(item);
                    }
                    if (entry.name.includes('habilidades')) {
                        masterHabilidades.push(item);
                    }
                });
            }
        }
    }
}

scanDir(RAW_DIR);

masterRituais.sort((a, b) => a.nome.localeCompare(b.nome));
masterHabilidades.sort((a, b) => a.nome.localeCompare(b.nome));

// Output stays JSON for React consumption speed and type-safety
fs.writeFileSync(path.join(OUT_DIR, 'rituais.json'), JSON.stringify(masterRituais, null, 2));
fs.writeFileSync(path.join(OUT_DIR, 'habilidades.json'), JSON.stringify(masterHabilidades, null, 2));

console.log(`Compilação YML -> JSON finalizada! ${masterRituais.length} rituais e ${masterHabilidades.length} habilidades processados.`);

