let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EventSchema = mongoose.Schema({
    title: {
        type: String
    },
    image:{
        type:String
    },
    eventDate:{
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('event', EventSchema, 'event');
