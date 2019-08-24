let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    profileUrl:{
      type: String  
    },
    phoneNumber:{
        type: Number  
    },
    role:{
        type : String,
        enum : [ "ADMIN", "MEMBER", "USER" ],
        default: "MEMBER"
    },
    isActive:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false},
    

});


UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', UserSchema, 'user');
