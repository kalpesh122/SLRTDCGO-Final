import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
// mongodb+srv://Kalpesh:Kalpesh@3takle@cluster0.yh478.mongodb.net/test

const app = express()
dotenv.config()
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Hello to Slrtdc-go API')
})

const PORT = process.env.PORT || 8000

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port :${PORT}`)
    }),
  )
  .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)
// app.listen()
