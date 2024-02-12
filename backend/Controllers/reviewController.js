import Review from '../models/ReviewSchema.js';
import Organiser from '../models/OrganiserSchema.js';

export const getAllReviews =async(req,res)=>{

    try{
        const reviews =await Review.find({})

        res.status(200).json({success:true,message:'Successsul',data:reviews})

    }catch(err){
        res.status(404).json({success:false,message:'not found'})
    }
};
//create review
export const createReview =async(req,res)=>{
    if(!req.body.organiser) req.body.organiser = req.params.organiserId
    if(!req.body.user) req.body.user = req.userId

    const newReview = new Review(req.body);

    try{
        const savedReview = await newReview.save();

        await Organiser.findByIdAndUpdate(
            req.body.organiser,
            { $push: { reviews:savedReview._id } },
            
        );
        

        res.status(200)
            .json({success:true,message:'Review Submitted',data:savedReview});

    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};