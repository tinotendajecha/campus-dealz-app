import express, { Router }  from "express";
const router:   Router = express.Router();
import {
    createUser,
    loginUser,
    updateUserProfile
} from '../controllers/UserController';
import { authenticate } from "../Middlewares/authMiddleware";


router.post('/signup', createUser);
router.post('/signin', loginUser);
router.put('/update', authenticate , updateUserProfile);

export default router;

