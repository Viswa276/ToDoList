const jwt= require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    console.log(token);
    if(!token){
        return res.status(403).json({message:"No token provided"});
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err) return res.status(401).json({message:"Invalid token"})
            req.user=decode;
        next();
    })
};

module.exports={verifyToken};