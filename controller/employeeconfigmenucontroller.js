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
var configMenuRouter = express_1.default.Router();
const uris_1 = require("../common/uris");
const employeeconfigmenuactions_1 = require("../dbmodels/employeemenus/employeeconfigmenuactions");
const service_1 = require("../dbmodels/knex/service");
const confMenus = new employeeconfigmenuactions_1.EmployeeConfigMenuActions();
const _menuAccess = new service_1.KnexQueryService();
let errorMessage = { message: "", code: 0 };
configMenuRouter.get(`/${uris_1.ConfigMenuURIs.GET_ALL_MENUS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let menus = req.body;
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    menus.department = params === null || params === void 0 ? void 0 : params.data;
    console.log(menus);
    const { data, error } = yield confMenus.PrepareQuery("GET", menus, menus, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
configMenuRouter.put(`/${uris_1.ConfigMenuURIs.UPDATE_MENUS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let menus = req.body;
    const { data, error } = yield confMenus.PrepareQuery("PUT", menus, menus, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
configMenuRouter.get(`/${uris_1.ConfigMenuURIs.GET_ACCESS_BY_MENU}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let access = req.body;
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    access.department = params === null || params === void 0 ? void 0 : params.data;
    const _menu = String(params === null || params === void 0 ? void 0 : params.menu);
    console.log(params === null || params === void 0 ? void 0 : params.data, params === null || params === void 0 ? void 0 : params.menu);
    const { data, error } = yield confMenus.PrepareQuery("GET", access, access, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({
            success: true,
            data: data,
            message: error,
            status: 200,
        }, null, 2));
        res.end();
    }
}));
exports.default = configMenuRouter;
//# sourceMappingURL=employeeconfigmenucontroller.js.map