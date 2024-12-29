const express=require('express');
const cors=require("cors");
const bodyParser=require('body-parser')
const schema=require('./models/Schema')
const auth=require('./controllers/authentication')
const app=express();
const port=5000;
const connectDB=require('./config/db')


// dataBase connection 
connectDB();
//middleware
app.use(cors());
app.use(bodyParser.json());

// models finding  
let usersSchema=schema.find((schema)=>schema.collectionName ==="users").model


app.post('/api/users-insert',async(req,res)=>{
    try {
        const {userName,password}=req.body
        const usersInsertData=await usersSchema.insertMany([{userName,password}]);
        if(usersInsertData.length<0){
            return res.status(404).json({success:false,message:"insert level error",data:[]})
        }
        res.status(200).json({success:true,message:"User Inserted SuccessFully",data:usersInsertData})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while inserting user level',
            error: error.message, // Optional: include the error message for debugging
          });
    }
})

app.post('/api/get-users',async(req,res)=>{
    try {
        let _filter=[
            {
                $match:{
                    userName:req.body.userName,
                    password:req.body.password
                }
            }
        ]
        const getUsers=await usersSchema.aggregate(_filter);
        if(getUsers.length<0){
            return res.status(404).json({success:false,message:'No User found',data:[]})
        }
        res.status(200).json({success:true,message:"User Found Successfully",data:getUsers})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching users',
            error: error.message, // Optional: include the error message for debugging
          });
    }
})

//login  
app.post('/api/user-login',async(req,res)=>{
    try {
        //let {userName,password}=req.body;
        let _filter=[
            {
                $match:{userName:req.body.userName,password:req.body.password}
            }
        ]
        let userDetails=await usersSchema.aggregate(_filter);
        if (userDetails.length<0){
            return res.status(404).json({success:false,message:'No User found',data:[]})
        }else{
            let loginData=await auth.generateToken(req.body);
            if(loginData.length<0){
                return res.status(401).json({success:false,message:"user is not authenticated"})
            }
            res.status(200).json({success:true,message:"user authentication is successfully completed",token:loginData})
        }
    } catch (error) {
        res.status(500).json({success:false,message:"user authentication is failed",data:[]})
    }
})

// user authentication scenario 
app.use(auth.authentication);

app.post("/api/get-usersData",async(req,res)=>{
    try {
        const getData=await usersSchema.find({})
        res.status(200).json({success:true,message:"Found the Users",data:getData})
    } catch (error) {
        console.log(error)
    }
})



// star the server 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})