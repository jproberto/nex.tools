import fs from 'fs';

function updateFile(path: string) {
  let data = JSON.parse(fs.readFileSync(path, 'utf8'));
  data.forEach((item: any) => {
    if (typeof item.elemento === 'string') {
      item.elemento = [item.elemento];
      
      // Fix for "Amaldiçoar Arma" to have all 4 elements
      if (item.nome === 'Amaldiçoar Arma') {
        item.elemento = ['Sangue', 'Morte', 'Conhecimento', 'Energia'];
      }
    }
  });
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

updateFile('./src/data/rituais.json');
