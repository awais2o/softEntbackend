const express = require('express')
const auth = require('../middleware/auth')
const Product = require('../models/Product')

const router = express.Router()

// Add a product
router.post('/', auth, async (req, res) => {
  const { name, price, quantity, pictures } = req.body

  try {
    const newProduct = new Product({
      user: req.user.id,
      name,
      price,
      quantity,
      pictures
    })

    const product = await newProduct.save()
    res.json(product)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

module.exports = router
