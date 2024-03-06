const mongoose = require('mongoose')
// get the id user à partir de jwt donc on va creer un middleware
const postSchema=new mongoose.Schema({
    title:{type:String,unique:true},
    description:{type:String},
    author :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},  { timestamps: true },

)

const Post = mongoose.model('Post',postSchema)
module.exports=Post
