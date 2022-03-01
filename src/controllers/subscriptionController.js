const userModel = require("../models/userModel");
const subscriptionModel = require("../models/subscriptionModel");

//const { isValidString,isValidRequestBody,isValidObjectId,isVaildEmail } = require("../validations/validator.js")

const plansDetails={
    "FREE":["infinite",0.0],
    "TRAIL":[7,0.0],
    "LITE_1M":[30,100],
    "PRO_1M":[30,200],
    "LITE_6M":[180,500],
    "PRO_6M":[180,900]      
};



const subscription=async function(req,res){

    try{
        const requestBody=req.body
        const {user_name,plan_id,start_date}=requestBody;

        const isUserValid=await userModel.findOne({user_name:user_name})
        if(!isUserValid){
            return res.status(404).send({status:false,message:"user not exist"});
        };

        const startDate=new Date(start_date)       
        const validTillDate=startDate.setDate(startDate.getDate() + plansDetails[plan_id][0]); 
        const x=new Date(validTillDate)
        const valid_till = plan_id==="FREE"?plansDetails[plan_id][0]:x.getFullYear()+'-'+(x.getMonth()+1)+'-'+x.getDate();
        
        requestBody["valid_till"]=valid_till
        requestBody["amount"]=plansDetails[plan_id][1]
        

        const details=await  subscriptionModel.create(requestBody)
        return res.status(201).send({status:true,data:details})
        
    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }

};

const subscriptionDetails=async function(req,res){
    try{
        const details=await subscriptionModel.find({user_name:req.params.userName});
        if(!details){
            return res.status(404).send({status:false,message:"no subscription"})
        }

        return res.status(200).send({status:true,data:details})

    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
} ;

const subscriptionDetailsWithDate=async function(req,res){
    try{
        const details=await subscriptionModel.findOne({user_name:req.params.userName,start_date:req.params.date});
        if(!details){
            return res.status(404).send({status:false,message:"no subscription"})
        }

        const day1 = new Date(details.start_date);
        const day2 = new Date(details.valid_till);
        
        const difference= Math.abs(day2-day1);
        const days_left = Math.ceil(difference/(1000 * 3600 * 24))

        const data={
           plan_id: details.plan_id,
           days_left:days_left
        }

        return res.status(200).send({status:true,data:data})

    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }
}

module.exports = {
    subscription,
    subscriptionDetails,
    subscriptionDetailsWithDate
};
