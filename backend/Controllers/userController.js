import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js';
import Organiser from '../models/OrganiserSchema.js';

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update user",
        });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to Delete",
        });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select('-password');//Excludes password while sending data;

        res.status(200).json({
            success: true,
            message: "User Found",
            data: user,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "No User Found",
        });
    }
};

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');//Excludes password while sending data

        res.status(200).json({
            success: true,
            message: "Users Found",
            data: users,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
};

export const getUserProfile= async(req,res)=>{
    const userId =req.userId
    try{
        const user=await User.findById(userId)

        if(!user){
          return res.status(404).json({success:false,message: 'User not found'})  
        }

        const {password,...rest} =user._doc

        res.status(200).json({success:true,message:'Profile info is getting',data:{...rest}})

    }
    catch(err){
        return res
                .status(500)
                .json({success:false,message: 'Something went wrong cannot get'})  
    }
};

export const getMyAppointments = async(req,res)=>{
    try{

        //step 1 retreive appointment from booking
        const bookings = await Booking.find({user:req.userId})

        //step 2 extract organiser ids from appointments bookings
        const organiserIds=bookings.map(el=>el.organiser.id)
        //step 3 retreive organisers using organiser ids
        const organisers= await Organiser.find({_id: {$in:organiserIds}}).seleect('-password')

        res.status(200).json({success:true,message:'Appointments are getting',data:organisers})

    }
    catch(err){
        return res
                .status(500)
                .json({success:false,message: 'Something went wrong cannot get'})  
    }
}