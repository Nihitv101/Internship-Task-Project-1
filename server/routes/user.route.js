const router = require('express').Router();
const bcyprt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');


router.post('/register', async(req, res)=>{
    try{

        // check if the  user already exists
        const userExists = await User.findOne({email:req.body.email});
        if(userExists){
            return res.send({
                success:false,
                message:"User already exists"
            })
        }

        // hash password:
        const salt = await bcyprt.genSalt(10);
        const hashedPassword = await bcyprt.hash(req.body.password, salt);

        req.body.password = hashedPassword;

        const user = new User(req.body);
        await user.save();

        return res.send({
            success:true,
            message:"User created successfully"
        })
    }
    catch(error){
        return res.send({
            success:false,
            message: error.message,
        })
    }
})


router.post('/login', async(req, res)=>{
    try{
        // check if user exists:

        const user = await User.findOne({email:req.body.email});



        if(!user){
            return res.send({
                success:false,
                message:"User does not exist"
            })
        }

        // check is user type is matching with the admin type:

        if(user.type !== "admin"){
            return res.send({
                success:false,
                message:"You are not allowed to log in from here"
            })
        }


        // compare password:
        const validPassword = await bcyprt.compare(req.body.password, user.password);


        if(!validPassword){
            return res.send({
                success:false,
                message:"Invalid password"
            })
        }



        // create token:
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {
            expiresIn:'1d'
        });

    

        return res.send({
            success:true,
            message:"User logged in successfully",
            user:user,
            data:token,
        })

    }
    catch(error){
        return res.send({
            success:false,
            message:error.message,
        })
    }
})



module.exports = router;
