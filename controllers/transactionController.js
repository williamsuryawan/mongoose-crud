const Transaction = require('../models/transaction.js')

class TransactionController {
    static async create (req,res) {
        let newTransaction = await Transaction.create(req.body)
        res.status(201).json(newTransaction)
    }

    static find (req,res) {
        let transactionList = await Transaction.find().populate('member').populate('booklist')
        res.status(200).json(transactionList)
    }
    
}
module.exports = TransactionController;