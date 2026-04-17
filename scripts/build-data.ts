import fs from 'fs';
import path from 'path';

const RAW_DIR = './src/data/raw';
const OUT_DIR = './src/data';

function capitalize(str: string) {
    return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
        } else if (entry.name.endsWith('.json')) {
            const relativePath = path.relative(RAW_DIR, fullPath);
            const parts = relativePath.split(path.sep);
            
            // Expected format: group/source/file.json
            if (parts.length >= 3) {
                const grupo = parts[0];
                const content = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
                content.forEach((item: any) => {
                    item.grupo_fonte = capitalize(grupo);
                    if (entry.name === 'rituais.json') masterRituais.push(item);
                    if (entry.name === 'habilidades.json') masterHabilidades.push(item);
                });
            }
        }
    }
}

scanDir(RAW_DIR);

masterRituais.sort((a, b) => a.nome.localeCompare(b.nome));
masterHabilidades.sort((a, b) => a.nome.localeCompare(b.nome));

fs.writeFileSync(path.join(OUT_DIR, 'rituais.json'), JSON.stringify(masterRituais, null, 2));
fs.writeFileSync(path.join(OUT_DIR, 'habilidades.json'), JSON.stringify(masterHabilidades, null, 2));

console.log(`Compilação finalizada! ${masterRituais.length} rituais e ${masterHabilidades.length} habilidades processados.`);
