import jwt from 'jsonwebtoken';
import Organiser from '../models/OrganiserSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async(req,res,next)=>{
    //get token from header

    const authToken =req.headers.authorization

    //check token is exists

    if(!authToken || !authToken.startsWith('Bearer ')){
        return res
                .status(401)
                .json({success:false,message:'No token,authorization denied '});
    }
    try{
        const token = authToken.split(" ")[1]

        //Verify Token
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)

        req.userId=decoded.userId
        req.role=decoded.role
        next();//must be call next fuction
    }catch(err){
        if(err.name==='TokenExpiredError'){
            return res.status(401).json({message:'Token is expired'})

        }
        return res.status(401).json({success:false,message:'Invalid token'})
    }

};

export const restrict = roles=> async(req,res,next)=>{
    
    const userId=req.userId

    let user = {
        role: '' // Provide a default role if needed
    };

    const customer =await User.findById(userId)
    const organiser =await Organiser.findById(userId)

    if(customer){
        user=customer
    }
    if(organiser){
        user=organiser
    }

    if (!roles.includes(user.role)) {
        return res.status(401).json({ success: false, message: "You're not authorized" });
    }
    

    next();

};