import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

export const signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        if(!username||!email||!password){
            return res.status(400).json({message:"please provide necessary credentials"})
        }

        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({message:'user already exist'});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new User({
            username:username,
            email:email,
            password:hashedPassword
        })
        await newUser.save();
        const token=jwt.sign(
            {id:newUser._id},
            process.env.JWT_SECRET_KEY,
            { expiresIn: "8h" }
        )

        res.status(201).json({message:"user registered successfully",token,userId:newUser._id});

    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
}

export const login=async(req,res)=>{
    try{
         let {username,password}=req.body;
        if(!username||!password){
            return res.status(400).json({message:"please provide necessary credentials"})
        }

        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"invalid credentials"});
        }
        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET_KEY,
            { expiresIn: "8h" }
        )

        res.status(200).json({message:"user loggedin successfully",token,userId:user._id})

    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
}