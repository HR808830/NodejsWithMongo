let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ComplaintSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('complaint', ComplaintSchema, 'complaint');
