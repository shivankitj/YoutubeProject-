import { Router } from "express"
import {registerUser} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const userRouter= Router();

userRouter.get("/ping", (req, res) => {
    res.send("User route is connected!");
});

userRouter.post("/register",
    upload.fields(
[
    {
        name: "avatar",
        maxCount: 1
    },
    {
        name: "coverImage",
        maxCount: 1  
    }
]) ,registerUser);
// router.route("/login").post(login)  abhi humne controllers me login ka filenahi likha hai


export default userRouter;



