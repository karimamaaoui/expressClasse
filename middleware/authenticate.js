const jwt = require("jsonwebtoken")

const authenticate = (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token || !token.startsWith('Bearer')){
        return res.status(401).send("Authentication Failed")
    }
    try{
        //troodou fi tableau w takhou case 1 khater case 0 feha bearer
        const tokenData = token.split(' ')[1];
        const  decodedToken = jwt.verify(tokenData,process.env.JWT_SECRET)
        // ajouter fel req un userId bch nhout feha _id
        req.userId= decodedToken._id;
        next();

    }catch(err)
    {
        return  res.status(403).send({message: "Token is not valid"})
    }
}

module.exports = authenticate