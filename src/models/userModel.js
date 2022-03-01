const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   "user_name":{
       type:String
   }
    
} , { timestamps : true});

module.exports = mongoose.model('User1' , userSchema);