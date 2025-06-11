const Feed=require("../model/Feedback");
const mongoose=require("mongoose");
const express=require("express");
const router2=express.Router();
router2.post("/api/feedback",async(req,res)=>{
    try{
const {message,rating,userId}=req.body;
if(!message || !rating || !userId)
{
    res.status(404).json({message:"Some Data is not there"});
}
const feed=new Feed({message,rating,userId});
await feed.save();
return res.status(200).json({message:"Feedback Done Successfully"});
    }
    catch(err)
    {
        res.status(500).json({message:"Server Side Error"});
    }
})
module.exports=router2;