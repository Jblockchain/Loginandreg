const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")


const app=express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/LoginAndRegister" )
.then(()=> console.log("connection successful"))
.catch((err)=> console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
    const User = new mongoose.model( "User", userSchema)

app.post("/login",(req,res)=>{
    const {email,password} = req.body
    User.findOne({email : email},(err,user)=>{
        if(user){
                if(password === user.password){
                    res.send({message :" Login Successfull",user})
                }
                else {
                    res.send({message:"Password didnot match"})
            }
        } else {
            res.send({message :"user not registered"})
        }
    })
})

app.post("/register",(req,res)=>{
    // res.send("My API register")
    const {name,email,password} = req.body
    User.findOne({email : email}, (err,user)=>{
        if(user){
            res.send({message :"user already registered"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err =>{
                if(err){
                    res.send(err)
                } else {
                    res.send ({message : "Successfully Registered"})
                }
            })
        }
    })
    
})

app.listen(9002,()=>{
    console.log("Be started at port 9002")
})