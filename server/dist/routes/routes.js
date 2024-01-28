"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("../controllers/auth/login"));
const create_account_1 = __importDefault(require("../controllers/auth/create-account"));
const router = (0, express_1.Router)();
// router.post('/auth/login', login)
router.get('/auth/signup', create_account_1.default);
router.get('/auth/login', login_1.default);
exports.default = router;
