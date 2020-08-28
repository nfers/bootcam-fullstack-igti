import express from 'express'
import db from './database/config.js'
import routes from './routes/accountsRouter.js'

const app = express()
const port = 3030

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`API running in port ${port}`)
})