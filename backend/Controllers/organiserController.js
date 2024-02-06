import Organiser from '../models/OrganiserSchema.js';

export const updateOrganiser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedOrganiser = await Organiser.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedOrganiser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update Organiser",
        });
    }
};

export const deleteOrganiser = async (req, res) => {
    const id = req.params.id;

    try {
        await Organiser.findByIdAndDelete(id);

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

export const getSingleOrganiser = async (req, res) => {
    const id = req.params.id;

    try {
        const organiser = await Organiser.findById(id).select('-password');//Excludes password while sending data;

        res.status(200).json({
            success: true,
            message: "Organiser Found",
            data: organiser,
        });
    } catch (err) {
        res.status(404).json({
        success: false,
        message: "No Organiser Found",
        });
    }
};

export const getAllOrganiser = async (req, res) => {
    try {

        const {query} = req.query
        let organisers ;

        if(query){
            organisers=await Organiser.find({
                isApproved:'approved',
                $or:[
                    {name:{$regex:query,$options:'i'}},
                    {specialization:{$regex:query,$options:'i'}},
                ],
            }).select('-password');
        }else{
            organisers = await Organiser.find({isApproved:'approved'}).select('-password');//Excludes password while sending data
        }
        
        res.status(200).json({
            success: true,
            message: "Organisers Found",
            data: organisers,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Not Found",
        });
    }
};
