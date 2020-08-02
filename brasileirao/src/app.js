import express from 'express'
import dotenv from 'dotenv';
import routes from './routes/routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(routes)
app.use()

app.listen(process.env.PORT, () => {
 console.log(`running in port ${process.env.PORT}`)
})