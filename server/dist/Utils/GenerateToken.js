"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const key = process.env.JWT_SECRETE_KEY;
const environment = process.env.NODE_ENV;
const generateToken = (res, user_id) => {
    const token = jsonwebtoken_1.default.sign({ user_id }, key, {
        expiresIn: '1d'
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: environment != 'development',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    });
};
exports.default = generateToken;
