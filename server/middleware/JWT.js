const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const ACC_KEY=process.env.SECRET_KEY;
const REF_KEY=process.env.REFRESH_KEY
const generatAccesstoken = (user)=>{
    return jwt.sign(user,ACC_KEY,{expiresIn:'15m'});
}
const generateRefreshtoken = (user)=>{
    return jwt.sign(user,REF_KEY,{expiresIn:'7d'});
}
const verifyAccessToken=(token)=>{
    return jwt.verify(token,ACC_KEY);
}
const verifyRefreshToken= (token) =>{
    return jwt.verify(token,REF_KEY);
}
module.exports={generateRefreshtoken,generatAccesstoken,verifyAccessToken,verifyRefreshToken}