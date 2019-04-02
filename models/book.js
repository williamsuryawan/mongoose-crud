const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema ({
  isbn: {type: String},
  title: {type: String},
  author: {type: String},
  category: {type: String},
  stock: {type: Number} 
})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book;