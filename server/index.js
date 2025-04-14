const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const bcrypt=require('bcrypt')
require('dotenv').config();
const generatAccesstoken = require('./middleware/JWT.js').generatAccesstoken;
const generateRefreshtoken = require('./middleware/JWT.js').generateRefreshtoken;
const authenticateToken = require('./middleware/auth');
const app=express()


app.use(express.json())
app.use(cors())

const mongodb_uri=process.env.MONGO_URI;
mongoose.connect(mongodb_uri)
.then(()=>{console.log("connected to mongodb")})
.catch((err)=>{console.log(err)});

const registerSchema=new mongoose.Schema({
    email:{type:String,required:true},
    username:{type:String, required:true},
    password:{type:String,required:true}
});

const Registermodel=mongoose.model('Register',registerSchema);

app.post('/register',async (req, res) => {
    console.log("Received registration data");
    const { email, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    Registermodel.create({email:email,username:username,password:hashedPassword})
    .then(data => {
        console.log("Data saved")
        res.json(data);
    })
    .catch(err => {
        console.log("Registration failed:", err.message);
    });
});


app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    try{
        const user= await Registermodel.findOne({username:username});
        if(!user){
            console.log("No such user found")
            return res.status(404).json({message:"User not found"})
        }

        const isMathch=await bcrypt.compare(password,user.password);
        
        if(!isMathch){
            return res.status(400).json({message:"Invalid password"})
        }
        const payload = { username: user.username, id: user._id }; 
        const newaccessToken = generatAccesstoken(payload);
        const newrefreshToken = generateRefreshtoken(payload);
        console.log("Login successful")
        return res.status(200).json({
            message: "Login Successful",
            accessToken:newaccessToken,
            refreshToken:newrefreshToken,
            username: user.username
        });


    }catch(err){
        return err.message;
    }
    
    console.log("Received login data",req.body);
})



const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});