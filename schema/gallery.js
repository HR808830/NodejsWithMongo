let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GallerySchema = mongoose.Schema({
    title: {
        type: String
    },
    image:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('gallery', GallerySchema, 'gallery');
