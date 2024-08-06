const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config() // Load environment variables from .env file
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err))

// Routes
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Hello, MERN Stack!')
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
