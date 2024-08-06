const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  pictures: [
    {
      type: String,
      required: true
    }
  ]
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
