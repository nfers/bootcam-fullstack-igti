import { promises as fs } from 'fs';


export const times = []

getData()

async function getData() {
 try {
  const data = JSON.parse(await fs.readFile("2003.json"));


  data[0].partidas.forEach(partida => {
   times.push({ time: partida.mandante, pontuacao: 0 })
   times.push({ time: partida.visitante, pontuacao: 0 })
  })
  console.log(times)

 } catch (err) {
  console.error(err)
 }

}




