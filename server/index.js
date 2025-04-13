const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')
const bcrypt=require('bcrypt')
require('dotenv').config();
const generatAccesstoken = require('./middleware/JWT.js').generatAccesstoken;
const generateRefreshtoken = require('./middleware/JWT.js').generateRefreshtoken;

const app=express()

app.use(cors())
app.use(express.json())

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
            return res.status(400).json({message:"User not found"})
        }

        const isMathch=await bcrypt.compare(password,user.password);
        
        if(!isMathch){
            return res.status(400).json({message:"Invalid password"})
        }
        console.log("Login successful")
        const accessToken= generatAccesstoken(user);
        const refreshToken= generateRefreshtoken(user);
        return res.status(200).json({
            message: "Login Successful",
            accessToken,refreshToken,
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