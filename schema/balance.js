let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BalanceSchema = mongoose.Schema({
    price:{
        type: Number,
        default:0
    },
    userId:{
        type: Schema.Types.ObjectId
    },
    type:{
        type : String,
        enum : [ "INCOME", "OUTCOME" ],
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('balance', BalanceSchema, 'balance');
