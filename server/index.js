import  express  from "express";
import cors from 'cors'
import mongoose from 'mongoose'


const app=express()
const port=3000

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/mern_demo")


app.get("/",(req,res)=>{
    res.send("server running")
})

app.post("/api/register",(req,res)=>{
    console.log(req.body);
    // res.json({message:'message'})
    mongoose.connection.collection("users").insertOne(req.body).then((response)=>{
        res.json({message:"successfully inserted"})
    }
        )
        
})





app.post("/api/login",(req,res)=>{
    console.log(req.body);

    mongoose.connection.collection("users").findOne({email:req.body.email}).then((response)=>{
        // res.json({message:"successfully added"})
    if (response) {
        mongoose.connection.collection("users").findOne({password:req.body.password}).then((response)=>{

            if(response){
                res.status(200).json({message:"logined",token:"1234"})
            }else{
                res.status(400).json({message:"password invalid"})
            }
        })
    } 
    else{
        res.status(400).json({message:"email is invalid"})
    }
    })
})




app.post("/api/product",(req,res)=>{
    console.log(req.body);
    // res.json({message:'message'})
    mongoose.connection.collection("product").insertOne(req.body).then((response)=>{
        res.json({message:"successfully inserted"})
    }
        )
        
})


app.get("/api/product",async(req,res)=>{
    // console.log(req.body);
    // res.json({message:'message'})
    const response = await mongoose.connection.collection("product").find().toArray();

    if(response.length=== 0) return res.status(400).json({message:"nno data"})
        
    res.status(200).json({products:response})
})

app.delete("/api/product",(req,res)=>{
    console.log(req.body);

    mongoose.connection.collection("product").drop().then((response)=>{
        console.log(response);
        res.status(200).json({message:"succesfully dlted"})
    }).catch((error)=>{
        console.log(error);
        res.status(400).json({message:"error"})
    })
})



app.listen(port,()=>console.log("server is listening to port 3000"));