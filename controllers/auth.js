const User=require('../models/User');
const Jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const signup=async(req,res)=>{
    try{
        const {name,email,password}= req.body;
        if(!name||!email||!password){
            return res.status(400).json({msg:"missing feild"});
        }
        const isavailable=await User.findOne({email});
        if(isavailable){
            return res.status(400).json({msg:"email id already exists"});
        }

        
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser=await User.create({name,email,password:passwordHash});
        res.status(201).json(newUser);

    }catch(error){
        res.status(400).json({error:error.message});
    }

};
const login=async(req,res)=>{
    try{
        const {password,email}=req.body;
        
        if(!password||!email){
            return res.json({msg:"missing feild"});
        }
        const is_email_present=await User.findOne({email:email}); 
        
        if(!is_email_present){
            return res.status(400).json({msg:"invalid credentials"});
        }
        const passwordhash=await bcrypt.compare(password,is_email_present.password);
        
        if(!passwordhash){
            return res.status(400).json({msg:"invalid credentials"});
        }

        const token=Jwt.sign({id:is_email_present._id},"harsh");
        is_email_present.password='';
        res.status(200).json({msg:'user logged in successfully',token,is_email_present});


    }catch(error){
        res.status(400).json({error:error.message});
    }

}
module.exports={login,signup};