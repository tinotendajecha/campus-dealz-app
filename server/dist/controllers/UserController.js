"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.loginUser = exports.createUser = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const GenerateToken_1 = __importDefault(require("../Utils/GenerateToken"));
const HashData_1 = require("../Utils/HashData");
//create new user
const createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash_password = (0, HashData_1.hashservice)(req.body.password);
    const user = {
        username: req.body.username,
        password: hash_password,
        firstname: req.body.first_name,
        lastname: req.body.last_name,
        email: req.body.email_address,
    };
    const find_user = yield connection_1.default.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (find_user) {
        res.status(400);
        throw new Error("User already exists");
    }
    const new_user = yield connection_1.default.user.create({
        data: user,
    });
    if (new_user) {
        (0, GenerateToken_1.default)(res, new_user.id);
        res.status(201).json({
            first_name: new_user.firstname,
            last_name: new_user.lastname,
            email_address: new_user.email,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));
exports.createUser = createUser;
//login user
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash_password = (0, HashData_1.hashservice)(req.body.password);
    const user = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email_address,
    };
    const find_user = yield connection_1.default.user.findUnique({
        where: {
            email: user.email,
        },
    });
    if (find_user && find_user.password === hash_password) {
        (0, GenerateToken_1.default)(res, find_user.id);
        res.status(201).json({
            first_name: find_user.firstname,
            last_name: find_user.lastname,
            email_address: find_user.email,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
}));
exports.loginUser = loginUser;
//update user profile
const updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let hash_password;
    let user;
    const reqUser = req.user;
    console.log('req', req.user);
    const find_user = yield connection_1.default.user.findUnique({
        where: {
            id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        },
    });
    if (req.body.password && find_user) {
        hash_password = (0, HashData_1.hashservice)(req.body.password);
        yield connection_1.default.user.update({
            where: {
                id: find_user.id,
            },
            data: {
                password: hash_password,
            },
        });
        res.status(200);
    }
    if (find_user) {
        user = {
            username: req.body.username || find_user.username,
            firstname: req.body.firstname || find_user.firstname,
            lastname: req.body.lastname || find_user.lastname,
            email: req.body.email || find_user.email,
        };
        const updatedUser = yield connection_1.default.user.update({
            where: {
                id: find_user.id,
            },
            data: user,
        });
        res.status(200).json(updatedUser);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
}));
exports.updateUserProfile = updateUserProfile;
