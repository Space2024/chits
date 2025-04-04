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
var groupRouter = express_1.default.Router();
const groupactions_1 = require("../dbmodels/group/groupactions");
const uris_1 = require("../common/uris");
const group = new groupactions_1.GroupActions();
let errorMessage = { message: "", code: 0 };
groupRouter.get(`/${uris_1.GroupURIs.GET_ALL_GROUPS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let grp = req.body;
    console.log("am entering into group router");
    const { data, error } = yield group.PrepareQuery("GET", grp, grp, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
groupRouter.post(`/${uris_1.GroupURIs.INSERT_GROUP}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let grp = req.body;
    console.log("am entering into group router");
    const { data, error } = yield group.PrepareQuery("POST", grp, grp, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
groupRouter.put(`/${uris_1.GroupURIs.UPDATE_GROUP}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let grp = req.body;
    console.log("am entering into group router");
    const { data, error } = yield group.PrepareQuery("PUT", grp, grp, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
groupRouter.delete(`/${uris_1.GroupURIs.DELETE_GROUP}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let grp = req.body;
    console.log("am entering into group router");
    const { data, error } = yield group.PrepareQuery("DELETE", grp, grp, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
exports.default = groupRouter;
//# sourceMappingURL=groupcontroller.js.map