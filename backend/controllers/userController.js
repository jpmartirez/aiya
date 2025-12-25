// API for user registration

import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// API to register a new user
export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.json({message: 'User already exists', success: false});
        }

        const newUser = new User({name, email, password});

        await newUser.save();

        const token = generateToken(newUser._id);
        console.log("New user registered")
        res.json({ token, success: true});
    } catch (error) {
        return res.json({success: false, message: error.message});

    }
}

// API to login user
export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch){
                const token = generateToken(user._id);
                return res.json({token, success: true});
            }
        }

        return res.json({success: false, message: 'Invalid email or password'});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}   


// API to get user details
export const getUserDetails = async (req, res) => {
    try {
        const user = req.user;
        return res.json({user, success: true});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}