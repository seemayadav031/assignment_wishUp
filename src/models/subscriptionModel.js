const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({

    "user_name":{
        type:String
    },
    "plan_id":{
        type:String,
        enum:["FREE","TRAIL","LITE_1M","PRO_1M","LITE_6M","PRO_6M"]
    },

    "start_date":{
        type:Date
    },

    "valid_till":{
        type:Date
    }

} , { timestamps : true});

module.exports = mongoose.model('Subscription1' , subscriptionSchema);