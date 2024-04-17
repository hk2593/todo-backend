const mongoose=require('mongoose');
const User=require('./User');

const todoSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
     },
     date:{
        type:String,
        require:true,
     },
     title:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        required:true
     }
     ,
     status:{
        type:String,
        enum:['Pending','Completed','Trash'],
        default:'Pending',
        required:true
     }
})

const Todo=mongoose.model("Todo",todoSchema);
module.exports=Todo;