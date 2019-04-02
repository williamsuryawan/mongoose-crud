const Book = require('../models/book.js')

class BookController {
    static async create(req,res) {
        console.log("Masuk sini", req.body)
        let newBook = await Book.create(req.body)
        res.status(201).json(newBook)
    }

    static async findAll(req,res) {
        console.log("masuk search", req.query)
        let findMe= {}
        if(req.query.q) {
            findMe = {
                $or: [{title:{
                  $regex: '.*' + req.query.q + '.*',
                  $options: "i"
                 }},{author: {
                  $regex: '.*' + req.query.q + '.*',
                  $options: "i"
                }}]
            }
        }
    
        let books = await Book.find(findMe);
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

    static async delete(req,res) {
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