const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const JWT_SECRET=process.env.SECRET_KEY;

const generatAccesstoken = (user)=>{
    return jwt.sign(username,JWT_SECRET,{expiresIn:'15m'});
}
const generateRefreshtoken = (user)=>{
    return jwt.sign(username,JWT_SECRET,{expiresIn:'7d'});
}

module.exports={generateRefreshtoken,generatAccesstoken}