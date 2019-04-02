const mongoose = require('mongoose');
const Schema = mongoose.Schemaa;

const transactionSchema = new Schema ({
    member: {type: Schema.Types.ObjectId, ref: 'User'},
    in_date: {type: Date},
    out_date: {type: Date},
    due_date: {type: Date},
    fine: {type: Number},
    booklist: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
})

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;