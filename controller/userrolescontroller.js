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
const uris_1 = require("../common/uris");
const userroleactions_1 = require("../dbmodels/userroles/userroleactions");
var userrolesRouter = express_1.default.Router();
const userrole = new userroleactions_1.UserRoleActions();
let errorMessage = { message: "", code: 0 };
userrolesRouter.get(`/${uris_1.UserRolesURIs.GET_ALL_USERROLES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let grp;
    console.log("am entering into group router");
    const { data, error } = yield userrole.PrepareQuery("GET", grp, undefined, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
userrolesRouter.post(`/${uris_1.UserRolesURIs.INSERT_USERROLE}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _role = req.body;
    let role = {
        userroleid: 0,
        concernid: _role.concern,
        role: _role.userrole,
        isactive: _role.isdeleted == "No" ? false : true,
        insert_update: 1,
        isdeleted: _role.isdeleted,
    };
    console.log(_role);
    console.log(role);
    const { data, error } = yield userrole.PrepareQuery("POST", role, role, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
userrolesRouter.put(`/${uris_1.UserRolesURIs.UPDATE_USERROLE}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _role = req.body;
    let role = {
        userroleid: _role.concernroleid,
        concernid: _role.concern,
        role: _role.userrole,
        isactive: _role.isdeleted == "No" ? false : true,
        insert_update: 2,
        isdeleted: _role.isdeleted,
    };
    console.log(_role);
    console.log(role);
    const { data, error } = yield userrole.PrepareQuery("PUT", role, role, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
exports.default = userrolesRouter;
//# sourceMappingURL=userrolescontroller.js.map