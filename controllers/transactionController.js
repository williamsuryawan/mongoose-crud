const Transaction = require('../models/transaction.js')

class TransactionController {
    static async create (req,res) {
        try {
            let newTransaction = await Transaction.create(req.body)
            res.status(201).json(newTransaction)
        } catch (err) {
            console.log("Terjadi error", err.errors)
            if (err.errors.member) {
                res.status(409).json(err.message);
            } else if(err.errors.booklist) {
                res.status(409).json(err.message);
            } else if(err.errors.due_date) {
                res.status(409).json(err);
            } else {
                res.status(500).json(err);
            }
        }
    }

    static async findAll (req,res) {
        console.log("Masuk ke find", req.query.q)
        let transactionList = await Transaction.find({}).populate('member').populate('booklist')
        if(!req.query.q) {
            res.status(200).json(transactionList)
        } else {
            let searchedTransaction = [];
            transactionList.map((transaction, index) => {
                transaction.booklist.map((book) => {
                    if (book._id.toString() == req.query.q) {
                        searchedTransaction.push(transactionList[index])
                    }
                })
            })
            res.status(200).json(searchedTransaction)
        }
    }

    static async update (req,res) {
        try {
            let updatedTransaction = await Transaction.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
            res.status(200).json(updatedTransaction)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async delete(req,res) {
        try {
            let foundTransaction = await Transaction.findOne({_id: req.params.id})
            let deletedTransaction = await Transaction.findOneAndDelete({_id: req.params.id})
            res.status(200).json(foundTransaction)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    
}
module.exports = TransactionController;