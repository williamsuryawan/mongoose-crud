const Book = require('../models/book.js')

class BookController {
    static async create(req,res) {
        let newBook = await Book.create(req.body)
        res.status(201).json(newBook)
    }

    static async findAll(req,res) {
        let books = await Book.findAll({});
        res.status(200).json(books)
    }

    static async update(req,res) {
        console.log("masuk ke update book", req.params, req.body)
        try {
            let updatedBook = await Book.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
            res.status(200).json(updatedBook);
        } catch (err) {
            res.status(500).json(err.message)
        }
        
    }

    static async delete(res,res) {
        console.log("masuk ke delete book", req.params)
        try {
            let foundBook = await Book.findOne({_id: req.params.id})
            let deletedBook = await Book.findOneAndDelete({_id:req.params.id})
            res.status(200).json(foundBook)
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

}

module.exports = BookController;