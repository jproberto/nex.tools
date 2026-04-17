import fs from 'fs';
import path from 'path';

const DATA_DIR = './src/data';
const RAW_DIR = path.join(DATA_DIR, 'raw');

const rituais = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'rituais.json'), 'utf8'));
const habilidades = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'habilidades.json'), 'utf8'));

function getFolder(fonte: string) {
    const f = fonte.toLowerCase();
    if (f === 'oprpg' || f === 'livro base') return ['livros_oficiais', 'oprpg'];
    if (f.includes('sah') || f.includes('sobrevivendo')) return ['livros_oficiais', 'sah'];
    return ['outros', 'desconhecido'];
}

function distribute(data: any[], fileName: string) {
    for (const item of data) {
        const [group, source] = getFolder(item.fonte);
        const dir = path.join(RAW_DIR, group, source);
        fs.mkdirSync(dir, { recursive: true });
        const filePath = path.join(dir, fileName);
        let fileData: any[] = [];
        if (fs.existsSync(filePath)) {
            fileData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
        fileData.push(item);
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    }
}

fs.rmSync(RAW_DIR, { recursive: true, force: true });
distribute(rituais, 'rituais.json');
distribute(habilidades, 'habilidades.json');

console.log('Migração para /raw/ concluída com sucesso!');
