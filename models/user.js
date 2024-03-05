const mongoose = require('mongoose')
const bcrypt =require('bcrypt')

const userSchema=new mongoose.Schema({
    username:{type:String,unique:true},
    password:String

})

//methde apres save 
userSchema.pre('save',async function(next){
    let user=this;
    if(user.isModified('password'))
    {
        user.password= await bcrypt.hash(user.password,10);
    }
    next();
})


const User =mongoose.model('User',userSchema)
module.exports=User