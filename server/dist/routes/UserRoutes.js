"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../Middlewares/authMiddleware");
router.post('/signup', UserController_1.createUser);
router.post('/signin', UserController_1.loginUser);
router.put('/update', authMiddleware_1.protect, UserController_1.updateUserProfile);
exports.default = router;
