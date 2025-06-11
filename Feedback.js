const mongoose=require("mongoose");
const feedbackSchema=new mongoose.Schema({
    rating:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    },userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
})
const Feed=mongoose.model("Feed",feedbackSchema);
module.exports=Feed;