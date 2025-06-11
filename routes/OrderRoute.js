const express=require("express");
const router1=express.Router();
const Order=require("../model/Order");
router1.post("/api/orders",async(req,res)=>{
    try{
                const {items,user,total}=req.body;
                if (!items || !Array.isArray(items) || !user || !total) {
                    console.log("first",req.body);
                    return res.status(400).json({ message: "Invalid order data" });
                  }
                  
                const order=new Order({items,user,total});
                console.log("first1")
                await order.save();
                return res.status(200).json({message:"Order Added Successfully"});
    }
    catch(err)
    {
       return res.status(501).json({message:"server sidde error"});
    }
})
module.exports=router1;