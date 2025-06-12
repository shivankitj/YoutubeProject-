import { Router } from "express"
import {registerUser} from "../controllers/user.controller.js"

const router= Router();

router.route("/register").post(registerUser)
// router.route("/login").post(login)  abhi humne controllers me login ka filenahi likha hai


export default router;