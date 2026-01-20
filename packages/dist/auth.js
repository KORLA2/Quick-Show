"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpSchema = zod_1.default.object({
    name: zod_1.default.string().min(2, 'Name must be at least 2 characters long').max(50, 'Name must be at most 50 characters long'),
    email: zod_1.default.email("Invalid Email Address"),
    password: zod_1.default.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: zod_1.default.string().min(6, 'Confirm Password must be at least 6 characters long')
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
}).strict();
exports.signInSchema = zod_1.default.object({
    email: zod_1.default.email("Invalid Email Address"),
    password: zod_1.default.string().min(6, 'Password must be at least 6 characters long'),
}).strict();
