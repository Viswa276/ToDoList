const express= require('express')
const mongoose= require('mongoose')
const cors= require('cors')


const app=express()
const PORT= 5000;


app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/week3_assingment")

.then(()=>{console.log("connected to mongodb")})
.catch((err)=>{console.log(err)});

const registerSchema=new mongoose.Schema({
    email:{type:String,required:true},
    username:{type:String, required:true, unique:true},
    password:{type:String,required:true}
});

const Registermodel=mongoose.model('Register',registerSchema);

app.post('/register',(req,res)=>{
    Registermodel.create(req.body)
    .then(data =>{res.json(data)})
    .catch(err =>{res.json(err)})
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
});