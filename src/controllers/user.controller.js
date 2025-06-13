import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    //get user Details
    //validation- Notempty
    //check if user already exist (usename,Email)
    //check for image , check avatar
    // upload on cloudinary
    // create user object - create entry in DB
    // check for user creation
    // return res


    const {fullName, email, username, password } = req.body 
    console.log("email: ",email);

});

export {
    registerUser
};
