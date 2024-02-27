const mongoose = require('mongoose')

const voitureSchema=new mongoose.Schema({
    name:{type:String,unique:true},

})

const Voiture =mongoose.model('Voiture',voitureSchema)
module.exports=Voiture