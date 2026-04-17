import fs from 'fs';

function updateFile(path: string) {
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data.forEach((item: any) => {
    if (item.fonte === 'Livro Base') item.fonte = 'OPRPG';
    else if (item.fonte === 'Sobrevivendo ao Horror') item.fonte = 'SaH';
  });
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

updateFile('./src/data/rituais.json');
updateFile('./src/data/habilidades.json');
