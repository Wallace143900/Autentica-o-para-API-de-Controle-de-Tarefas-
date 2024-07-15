"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleErrors = void 0;
const appError_1 = require("../errors/appError");
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
class HandleErrors {
    static execute(error, req, res, next) {
        if (error instanceof appError_1.AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        if (error instanceof zod_1.ZodError) {
            const dataError = { errors: error.issues };
            return res.status(400).json(dataError);
        }
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return res.status(401).json({ message: error.message });
        }
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.HandleErrors = HandleErrors;
