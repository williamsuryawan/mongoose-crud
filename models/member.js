const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memberSchema = new Schema ({
    name: {type: String},
    address: {type: String},
    zipcode: {type: String},
    email: {
        type: String,
        validate: [{
            isAsync: true,
            validator: function (value, cb) {
                User.find({email: value}, function (err, users) {
                    if(users.length > 0) {
                        cb(false)
                    } else {
                        cb(true)
                    }
                })
            },
            message: props => 'Email already exists'
        }]
    },
    phone: {
        type: String,
        validate: [{
            validator: function(value) {
                if(value.length <11 || value.length >13) {
                    return false
                }
                return true
            },
            message: props => 'Phone needs to be 11 and 13'
        }]}
})

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;