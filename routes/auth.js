const express=require('express');
const User = require('../models/user')
const bcrypt =require('bcrypt')
const jwt= require("jsonwebtoken")
//hajetna ken module router
const router=express.Router();

/*
router.post("/login",(req,res)=>{
    //res.send("<h1>Hey this is the login route </h2>");
  //this return undefiend   console.log(req.body)
  //il faut ajouter body parser
    res.send(req.body);
})

router.get("/register",(req,res)=>{
    res.send("<h1>Hey this is the register route </h2>");
})
router.post("/login",(req,res)=>{
  res.send("<h1>Hey this is the login route </h2>");
//this return undefiend   console.log(req.body)
//il faut ajouter body parser
  //res.send(req.body);
})

router.get("/register",(req,res)=>{
  const filePath = path.join(__dirname+"/index.html");
  console.log(filePath);
    res.sendFile(filePath);
  })


*/


  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).send("User not found" );
      }
  
      // Compare the entered password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).send("Invalid password ");
      }
      //siganture , id le premier donnee c'est quoi le data qu'on va crypter
      const token = jwt.sign({_id : user._id},process.env.JWT_SECRET)
      // send a success message
      res.status(200).send({token:token});
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send(error.message );
    }
  });
  
  router.post("/register", async (req, res) => {
    try {
      //tetsama destruct separate the body on partie
        const { username, password } = req.body;

        // Create a new user instance
        const newUser = new User({
            username,
            password,
        });
        console.log("data ",newUser);
  
        // Save the user to the database
        await newUser.save();
  
        res.status(201).send( 'User registered successfully' );
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message );
    }
  });



//exporter router from auth.js
module.exports=router;