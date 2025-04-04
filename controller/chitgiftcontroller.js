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
const express_1 = __importDefault(require("express"));
var chitGiftRouter = express_1.default.Router();
const uris_1 = require("../common/uris");
const chitgiftactions_1 = require("../dbmodels/chitgift/chitgiftactions");
const _giftaction = new chitgiftactions_1.ChitGiftActions();
let errorMessage = { message: "", code: 0 };
chitGiftRouter.get(`/${uris_1.ChitGiftURIs.GET_ALL_CHIT_GIFT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let gift = {};
    const { data, error } = yield _giftaction.PrepareQuery("GET", gift, undefined, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
chitGiftRouter.post(`/${uris_1.ChitGiftURIs.INSERT_CHIT_GIFT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let gift = req.body;
    console.log("am entering into post router");
    const { data, error } = yield _giftaction.PrepareQuery("POST", gift, gift, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
chitGiftRouter.put(`/${uris_1.ChitGiftURIs.UPDATE_CHIT_GIFT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let gift = req.body;
    console.log(gift);
    const { data, error } = yield _giftaction.PrepareQuery("PUT", gift, gift, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
chitGiftRouter.delete(`/${uris_1.ChitGiftURIs.DELETE_CHIT_GIFT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let gift = req.body;
    console.log(gift);
    const { data, error } = yield _giftaction.PrepareQuery("DELETE", gift, gift, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
exports.default = chitGiftRouter;
//# sourceMappingURL=chitgiftcontroller.js.map