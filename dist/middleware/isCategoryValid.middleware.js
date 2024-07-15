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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsCategoryIdValid = void 0;
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
class IsCategoryIdValid {
    static execute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const category = yield prisma_1.prisma.category.findFirst({
                where: { id: Number(id) }
            });
            if (!category) {
                throw new appError_1.AppError("Category not found", 404);
            }
            res.locals.category = category;
            next();
        });
    }
}
exports.IsCategoryIdValid = IsCategoryIdValid;
