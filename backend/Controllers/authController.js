import User from '../models/UserSchema.js';
import Organiser from '../models/OrganiserSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = user =>{
    return jwt.sign(
        {id:user.id,role:user.role},
        process.env.JWT_SECRET_KEY,
        {
        expiresIn:'15d'
        }
    )
}

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user = null;
        if (role === 'customer') {
            user = await User.findOne({ email });
        } else if (role === 'organiser') {
            user = await Organiser.findOne({ email }); // Corrected typo from emali to email
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === 'customer') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        if (role === 'organiser') {
            user = new Organiser({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        await user.save();

        res.status(200).json({ 
            success: true, 
            message: 'User successfully created' });

    } catch (err) {
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error, Try Again' });
    }
};

export const login = async (req, res) => {

    const {email} = req.body;

    try {
        
        let user =null

        const customer= await User.findOne({ email})
        const organiser=await Organiser.findOne({ email})

        if(customer){
            user=customer
        }
        if(organiser){
            user=organiser
        }

        //check if user exist or not
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        } // Added missing closing curly brace

        const isPasswordMatch = await bcrypt.compare(
            req.body.password, 
            user.password
        );

        if(!isPasswordMatch){
            return res.status(400).json({
                status: false,
                message: "Incorrect Password"
            });
        }

        //get Token
        const token=generateToken(user);

        const {password,role,appointments, ...rest} =user._doc;

        res
            .status(200)
            .json({
            status: true,
            message: "Successfully Login",
            token,
            data:{...rest},
            role
            });


    } catch (err) {
        res.status(500).json({
            status: false,
            message: "Failed to Login"
        });
    }

};
