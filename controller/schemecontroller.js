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
const url_1 = __importDefault(require("url"));
var schemeRouter = express_1.default.Router();
const uris_1 = require("../common/uris");
const schemeactions_1 = require("../dbmodels/scheme/schemeactions");
const _schemeaction = new schemeactions_1.SchemeActions();
let errorMessage = { message: "", code: 0 };
schemeRouter.get(`/${uris_1.SchemeURIs.GET_ALL_SCHEMES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    let scheme = params;
    const { data, error } = yield _schemeaction.PrepareQuery("GET", scheme, params, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
schemeRouter.post(`/${uris_1.SchemeURIs.INSERT_SCHEMES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let scheme = req.body;
    console.log("am entering into post router");
    const { data, error } = yield _schemeaction.PrepareQuery("POST", scheme, scheme, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
schemeRouter.put(`/${uris_1.SchemeURIs.UPDATE_SCHEMES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let scheme = req.body;
    console.log(scheme);
    const { data, error } = yield _schemeaction.PrepareQuery("PUT", scheme, scheme, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
schemeRouter.delete(`/${uris_1.SchemeURIs.DELETE_SCHEMES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let scheme = req.body;
    scheme.entrydate = new Date(scheme.entrydate.split("-").reverse().join("-"))
        .toISOString()
        .split("T")[0];
    console.log(scheme);
    const { data, error } = yield _schemeaction.PrepareQuery("DELETE", scheme, scheme, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
exports.default = schemeRouter;
//# sourceMappingURL=schemecontroller.js.map