import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.models.js"
import { uploadOnCLoudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiRespose.js";
import { response } from "express";

const registerUser = asyncHandler(async (req, res) => {
    //get user Details
    //validation- Notempty
    //check if user already exist (usename,Email)
    //check for image , check avatar
    // upload on cloudinary
    // create user object - create entry in DB
    // check for user creation
    // return res
   
    console.log("Register endpoint hit");
    console.log("Request Body:", req.body);
    console.log("Files:", req.files);

    const {fullName, email, userName, password } = req.body 
    console.log("email: ",email);

    if ( [fullName,email,userName,password].some((feild)=> feild?.trim() === "")){
        throw new ApiError(400,"Some feids are missing.");
    }
    // if ( fullName === ""){
    //     throw new ApiError(400,"FullName is required.");
    // }

    const existedUser =await User.findOne({
        $or: [{ email },{ userName }]
    })
    
    if(existedUser){
        throw new ApiError(409,"User with email or username exist.")
    }

    const avatarLocalPath= req.files?.avatar[0]?.path;
    // const coverimageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar to chiye hi, location nahi mila.")
    }

    const avatar = await uploadOnCLoudinary(avatarLocalPath);
    
    const coverImage = await uploadOnCLoudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar to chiye hi,cloudinary pe upload nahi hua.")
    }

    const user = await User.create(
        {
            fullName,
            avatar: avatar?.url,
            coverImage: coverImage?.url||"",
            email,
            password,
            userName: userName?.toLowerCase() || "sbc"

        }
    )

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong. while registering a user. ")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully.")

        )
});
 

export {
    registerUser
};
