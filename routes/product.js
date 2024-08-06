const express = require('express')
const auth = require('../middleware/auth')
const Product = require('../models/Product')
const multer = require('multer')
const { v2: cloudinary } = require('cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'media',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif', 'mp4'],
    resource_type: 'auto'
  }
})

const upload = multer({ storage: storage })

router.post('/', auth, async (req, res) => {
  const { name, price, quantity, pictures, user } = req.body

  try {
    const newProduct = new Product({
      user,
      name,
      price,
      quantity,
      pictures
    })

    const product = await newProduct.save()
    res.json(product)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.post('/upload', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: err.message })
    }
    if (!req.file) {
      return res.status(400).send({ error: 'No File Uploaded!' })
    }
    res.json({
      message: 'File uploaded successfully',
      url: req.file.path
    })
  })
})
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).send('Server error')
  }
})
module.exports = router
