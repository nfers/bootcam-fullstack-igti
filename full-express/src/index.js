import express from 'express';


const app = express()
app.use(express.json())

app.use((req, res, next) => {
 console.log(new Date());
 next();
})

app.get('/api', (req, res) => {
 res.send({
  message: "Em execução"
 })
})

app.listen(3000);