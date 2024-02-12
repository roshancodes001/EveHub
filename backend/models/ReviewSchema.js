import mongoose from "mongoose";
import Organiser from "./OrganiserSchema";

const reviewSchema = new mongoose.Schema(
  {
    organiser: {
      type: mongoose.Types.ObjectId,
      ref: "Organiser",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function(next){

  this.populate({
    path:"user",
    select:"name photo",
  });
  next(); 
});

reviewSchema.statics.calAverageRatings=async function(organiserId){

  //this points current review
  const stats= await this.aggregate([{
    $match:{organiser:organiserId}
  },
  {
    $group:{
      _id:'$organiser',
      numOfRating:{$sum:1},
      avgRating:{$avg:'$rating'},
    },
  },
]);
  
  await Organiser.findByIdAndUpdate(organiserId,{
    totalRating:stats[0].numOfRating,
    averageRating:stats[0].avgRating,
  });
};

reviewSchema.post('save',function(){
  this.constructor.calAverageRatings(this.organiser);
});



export default mongoose.model("Review", reviewSchema);
