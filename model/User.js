const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSign=new mongoose.Schema({
name:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true,
    unique:true
},
role:{
    type:String,
    required:true

}
,email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
}

})
userSign.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // skip if password isn't changed
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });
const User=mongoose.model("User",userSign);
module.exports=User;