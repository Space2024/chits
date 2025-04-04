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
var concernRouter = express_1.default.Router();
const uris_1 = require("../common/uris");
const concernsactions_1 = require("../dbmodels/concerns/concernsactions");
const _concernaction = new concernsactions_1.ConcernActions();
let errorMessage = { message: "", code: 0 };
concernRouter.get(`/${uris_1.ConcernURIs.GET_ALL_CONCERNS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    let concerns = params;
    const { data, error } = yield _concernaction.PrepareQuery("GET", concerns, params, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
concernRouter.post(`/${uris_1.ConcernURIs.INSERT_CONCERN}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let concerns = req.body;
    console.log("am entering into post router");
    const { data, error } = yield _concernaction.PrepareQuery("POST", concerns, concerns, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
concernRouter.put(`/${uris_1.ConcernURIs.UPDATE_CONCERN}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let concerns = req.body;
    console.log(concerns);
    const { data, error } = yield _concernaction.PrepareQuery("PUT", concerns, concerns, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
concernRouter.delete(`/${uris_1.ConcernURIs.DELETE_CONCERN}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let concerns = req.body;
    console.log(concerns);
    const { data, error } = yield _concernaction.PrepareQuery("DELETE", concerns, concerns, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
exports.default = concernRouter;
//# sourceMappingURL=concerncontroller.js.map