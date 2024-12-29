const mongoose=require('mongoose');
const schema = require('../models/Schema');
// const connectDB= async()=>{
//     try {
//         for (let {dataBaseName,collectionName} of schema){
//             let connection=await Mongoose.createConnection(`mongodb://localhost:27017/${dataBaseName}`,{useNewUrlParser:true,useUnifiedTopology:true,serverSelectionTimeoutMS: 30000})
//              // Listen for connection events
//              connection.on('connected', () => {
//                 console.log(`Successfully connected to the ${collectionName} database`);
//             });

//             connection.on('error', (error) => {
//                 console.log(`Error connecting to the ${collectionName} database:`, error);
//             });

//         }
        
//     } catch (error) {
//         console.log('Error connecting to the database', error);

//     }
// }

const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/chatGpt', {
        useNewUrlParser: true,
        useUnifiedTopology: true      });
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Database connection error:', err.message);
    }
  };

module.exports=connectDB