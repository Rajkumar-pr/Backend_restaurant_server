const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    items:{
        type:Array,
        required:true

    },
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"


    },total:{
        type:Number,
        required:true
    }
});
const Order=mongoose.model("Order",orderSchema);
module.exports=Order;