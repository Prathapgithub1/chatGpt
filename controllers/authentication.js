const jwt=require('jsonwebtoken');
const jwt_token="thisIsMyJsonWebToken";
 

const generateToken=async(user)=>{
    const payLoad={
        userName:user.userName,
        password:user.password
    }
    const token= await jwt.sign(payLoad,jwt_token,{expiresIn:"1h"});
    return token
}
const authentication=(req,res,next)=>{
    const authToken=req.headers.authtoken ;
    if(!authToken || !authToken.startsWith('Bearer ')){
        return res.status(401).json({
            success:false,
            message: 'Access token is missing or invalid.',
        })
    }
    const token=authToken.split(' ')[1];
    try {
        const decoded=jwt.verify(token,jwt_token);
        next();
    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'Invalid or expired token.',
          });      
    }
}

module.exports={
    generateToken,
    authentication
}