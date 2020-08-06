import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.json({message: "Vai se fuder seu filho da puta"})
})

app.listen(3333)