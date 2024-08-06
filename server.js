const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const app = express()

app.use(cors())
app.use(express.json())

const mongoURI = process.env.MONGO_URI
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err))

app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)

app.get('/', (req, res) => {
  res.send('Hello, MERN Stack!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
