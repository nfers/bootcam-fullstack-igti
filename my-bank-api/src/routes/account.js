import express from 'express';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const accountRouter = express.Router();

accountRouter.post('/', async (req, res) => {
 try {
  let account = req.body
  const data = JSON.parse(await readFile('account.json'));

  account = { id: data.nextId++, ...account }
  data.nextId++;
  data.accounts.push(account)

  await writeFile('account.json', JSON.stringify(data))

  res.status(200).send({ result: true, data: [{ id: account.id, name: account.name }] })
 } catch (error) {
  res.status(404).send({ error: error.message })
 }
})
export default accountRouter;