import User from '../models/usermodel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from '../lib/utils.js';
import dotenv from 'dotenv';
dotenv.config();

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        generateToken(user._id, res);
        return res.status(200).json({
            message: "Login successful",
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);
        return res.status(201).json({
            message: "Signup successful",
            user: savedUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log (error);
    }
};

const logout = (req, res) => {
    try{
        res.cookie('jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            expires: new Date(0), // Expire the cookie immediately
        });
        res.status(200).json({message:"Logout successful"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
};

const admin = (req, res) => {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (email === adminEmail && password === adminPassword) {
        const token = jwt.sign(
            { role: 'admin' },
            process.env.JWT_SECRET
        );
        return res.status(200).json({ message: 'Admin login successful', token });
    } else {
        return res.status(401).json({ message: 'Invalid admin credentials' });
    }
};

export { login, signup, logout, admin };