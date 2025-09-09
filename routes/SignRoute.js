const express=require("express");
const router=express.Router();
const User=require("../model/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const secret_key="my-super-secret-key-1234567890!@#$%^&*()";
router.post("/api/signup",async(req,res)=>{
try{
const {name,username,role,email,password}=req.body;
if(!name || !username || !role || !email || !password)
{
    console.log("password is:",password,role,email,username,name);
    return res.status(404).json({message:"Some Information is not present"});
}
const user=new User({ name, username, role, email, password });

await user.save();
const token=jwt.sign({username:user.username,role:user.role},secret_key,{expiresIn:'2h'});
return res.status(200).json({meassge:"Signup Done Successfull",token});

}

catch(err){
   
return res.status(501).json({message:"Server Side Error", error: err.message});
}
})
router.post("/api/login",async(req,res)=>{
    try{
const {username,password}=req.body;
const user=await User.findOne({username});
if(!user)
{
   return res.status(401).json({message:"username is incoorect"});
}
const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch)
{
   return res.status(401).json({message:"Enter Correct credentails"});
}
const token=jwt.sign({username:user.username,role.user.role},secret_key,{expiresIn:'2h'});
return res.status(200).json({meassge:"Login Done Successfull",token});
    }
    catch(err)
    {
       return res.status(500).json({message:"Server Side Error"});
    }
});
router.get("/user/:username",async(req,res)=>{
try{
const {username}=req.params;
const user=await User.findOne({username});
if(!user)
{
    return res.status(404).json({message:"User is not there"});
}
return res.status(200).json({message:"Use find successfully",user});
}
catch(err)
{
    return res.status(501).json({message:"Server Side error"});
}

})

module.exports=router;


