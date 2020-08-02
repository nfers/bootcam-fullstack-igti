import express from 'express';
import dotEnv from 'dotenv'
import accountRouter from './routes/account.js';
import { promises as fs } from 'fs'

dotEnv.config();

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('/account', accountRouter)

app.use('/api', (req, res) => {

 const body = req.body
 res.json({ message: 'Api Executing', body })
})

app.listen(process.env.PORT, async () => {
 try {
  await readFile('account.json');
  console.log(`API executing in port ${process.env.PORT}`)
 } catch (error) {
  const initialJson = {
   nextId: 1,
   accounts: []
  }

  writeFile('account.json', JSON.stringify(initialJson)).then(() => {
   console.log(`API executing in port ${process.env.PORT} and file created`);
  }).catch(err => {
   console.error(err)
  })
 }


});