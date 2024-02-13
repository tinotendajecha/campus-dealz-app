"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashservice = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashservice = (data) => {
    // Create a hash object
    const hash = crypto_1.default.createHash("sha256");
    // Hash the data
    hash.update(data);
    // Generate the hash digest
    return hash.digest("hex");
};
exports.hashservice = hashservice;
