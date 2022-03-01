const express = require('express')
const router = express.Router()
const userController=require('../controllers/userController');
const subscriptionController=require('../controllers/subscriptionController');


router.put('/user/:userName',userController.user);
router.get('/user/:userName',userController.userDetails);

router.post('/subscription',subscriptionController.subscription);
router.get('/subscription/:userName',subscriptionController.subscriptionDetails);
router.get('/subscription/:userName/:date',subscriptionController.subscriptionDetailsWithDate);




module.exports = router