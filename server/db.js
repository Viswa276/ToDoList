const mongoose= require('mongoose')
const mongodb_uri=process.env.MONGO_URI;
mongoose.connect(mongodb_uri)
.then(()=>{console.log("connected to mongodb")})
.catch((err)=>{console.log(err)});

const registerSchema=new mongoose.Schema({
    email:{type:String,required:true},
    username:{type:String, required:true},
    password:{type:String,required:true}
});


module.exports=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true    
    };
    try{ 
    }
}