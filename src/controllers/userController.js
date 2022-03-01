const userModel=require('../models/userModel');
const subscriptionModel=require('../models/subscriptionModel');

//const { isValidString, isValidRequestBody} = require('../validations/validator.js');

const user=async function(req,res){
    try{

        const userName=req.params.userName;
        const user=await userModel.create({user_name:userName});
        return res.status(200).send({status:true,data:user});

    }catch(error){
        return res.status(500).send({status:false,message:error.message});
    }
};

const userDetails=async function(req,res){
    try{
        const userName=req.params.userName;
        const userDetails=await userModel.find({user_name:userName});

        if(!userDetails){
            return res.status(404).send({status:false,message:"user not found"});
        }

        return res.status(200).send({status:true,data:userDetails});

    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
};

module.exports={
    user,
    userDetails
};
