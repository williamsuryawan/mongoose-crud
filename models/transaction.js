const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema ({
    member: {type: Schema.Types.ObjectId, ref: 'Member'},
    in_date: {type: Date, default: null},
    out_date: {type: Date},
    due_date: {type: Date},
    fine: {type: Number, default: 0},
    booklist: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
})

transactionSchema.pre('save', function(next) {
    this.out_date = new Date ();
    this.due_date = new Date (this.due_date);
    next();
})

function getDaysBetweenDates(d0, d1) {
    var msPerDay = 8.64e7;
    // Copy dates so don't mess them up
    var x0 = new Date(d0);
    var x1 = new Date(d1);
    // Set to noon - avoid DST errors
    x0.setHours(12, 0, 0);
    x1.setHours(12, 0, 0);
    // Round to remove daylight saving errors
    return Math.round((x1 - x0) / msPerDay);
}

transactionSchema.post('findOneAndUpdate', function(result,next) {
    if(result.in_date > result.due_date) {
        result.fine = getDaysBetweenDates(result.due_date, result.in_date) * 1000
    } else {
        result.fine = 0
    }
    result.save();
    next();
})

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;