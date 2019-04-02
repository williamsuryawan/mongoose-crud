const Transaction = require('../models/transaction.js')

class TransactionController {
    static async create (req,res) {
        let newTransaction = await Transaction.create(req.body)
        res.status(201).json(newTransaction)
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
        } catch {
            res.status(500).json(updatedTransaction)
        }
    }

    static async delete(req,res) {
        let foundTransaction = await Transaction.findOne({_id: req.params.id})
        let deletedTransaction = await Transaction.findOneAndDelete({_id: req.params.id})
        res.status(200).json(foundTransaction)
    }
    
}
module.exports = TransactionController;