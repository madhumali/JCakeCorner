const mongoose=require('mongoose');



const cakeSchema=mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    imagePath:{type:String,required:true},
    description:{type:String,required:true},
    features:[{feature:String}]
});

module.exports=mongoose.model('Cake',cakeSchema);