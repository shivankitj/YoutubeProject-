import { Router } from "express"
import {registerUser} from "../controllers/user.controller.js"

const router= Router();

router.post("/register", registerUser);
// router.route("/login").post(login)  abhi humne controllers me login ka filenahi likha hai


export default router;


// import express from "express";
// import { registerUser } from "../controllers/user.controller.js";
// import { upload } from "../middleware/multer.middleware.js"; // Your multer setup

// const router = express.Router();

// // POST route that accepts file upload (e.g. profile image)
// router.post("/register", upload.single("profilePic"), registerUser);

// export default router;
