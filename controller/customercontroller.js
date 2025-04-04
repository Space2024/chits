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
var customerRouter = express_1.default.Router();
const uris_1 = require("../common/uris");
const customeraction_1 = require("../dbmodels/customers/customeraction");
const groupactions_1 = require("../dbmodels/group/groupactions");
const service_1 = require("../dbmodels/knex/service");
const knex_1 = require("../dbmodels/knex/knex");
const _customeraction = new customeraction_1.CustomerActions();
const group = new groupactions_1.GroupActions();
const _knex = new service_1.KnexQueryService();
let errorMessage = { message: "", code: 0 };
customerRouter.get(`/${uris_1.CustomerURIS.VIEW_ALL_CUSTOMER}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    let customers = req.body;
    const { data, error } = yield _customeraction.PrepareQuery("GET", customers, params, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
customerRouter.get(`/${uris_1.CustomerURIS.GET_ALL_CUSTOMER}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customer = req.body;
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    const { data, error } = yield _knex.getCustomerByMobileNumber(customer, params === null || params === void 0 ? void 0 : params.data, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
customerRouter.post(`/${uris_1.CustomerURIS.INSERT_CUSTOMER}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customers = req.body;
    let _group = {
        serialnumber: customers.groupserialnumber,
        installmentamount: Number(customers.schemeamount),
        schemeid: customers.schemeid,
        startdate: customers.startdate,
        endate: customers.enddate,
        groupname: customers.groupname,
        cardnumber: customers.cardnumber,
    };
    const _data = yield knex_1.database
        .where("groupname", customers.groupname)
        .select("groupcount")
        .from("tbl_group");
    if (_data.length > 0) {
        yield (0, knex_1.database)("tbl_group")
            .where("groupname", customers.groupname)
            .update("groupcount", _data[0].groupcount + 1);
    }
    // .andWhere("cardnumber", Number(customers.mobileNo))
    const _dataCus = yield knex_1.database
        .where("schemeid", customers.schemeid)
        .andWhere("groupname", customers.groupname)
        .select("customergroupno")
        .orderBy("customergroupno", "desc")
        .limit(1)
        .from("tbl_customerschemes");
    console.log(_dataCus);
    const _cnt = _dataCus.length > 0 ? _dataCus[0].customergroupno + 1 : 1;
    const result = new Date();
    result.setDate(result.getDate() + 330);
    let _cusSchems = {
        customerid: customers.customerid,
        schemeid: customers.schemeid,
        groupname: customers.groupname,
        customergroupno: _cnt,
        maturitydate: result,
        cardnumber: Number(customers.mobileNo),
    };
    if (Number(customers.schemeamount) === 0) {
        const _dailyColl = yield knex_1.database
            .where("schemeid", customers.schemeid)
            .andWhere("customerid", customers.customerid)
            .andWhere("customergroupno", 1)
            .select("customergroupno")
            .from("tbl_customerschemes");
        if (_dailyColl.length === 0) {
            yield (0, knex_1.database)("tbl_customerschemes").insert(_cusSchems);
        }
    }
    else {
        yield (0, knex_1.database)("tbl_customerschemes").insert(_cusSchems);
    }
    // if (_cnt > 1) {
    //   await database("tbl_customerschemes")
    //     .where("schemeid", customers.schemeid)
    //     .andWhere("customerid", customers.customerid)
    //     .update("customergroupno", _cnt);
    // } else {
    // }
    const { data, error } = yield _customeraction.PrepareQuery("POST", customers, customers, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        if (_data.length === 0) {
            const { data, error } = yield group.PrepareQuery("POST", _group, _group, errorMessage);
        }
    }
    res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
    res.end();
}));
customerRouter.put(`/${uris_1.CustomerURIS.UPDATE_CUSTOMER}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customers = req.body;
    console.log(customers);
    const { data, error } = yield _customeraction.PrepareQuery("PUT", customers, customers, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
customerRouter.delete(`/${uris_1.CustomerURIS.DELETE_CUSTOMER}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customers = req.body;
    console.log(customers);
    const { data, error } = yield _customeraction.PrepareQuery("DELETE", customers, customers, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
customerRouter.get(`/${uris_1.CustomerURIS.GET_CUSTOMER_CLOSE_SCHEME_DETAILS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let customer = req.body;
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    console.log(params);
    const { data, error } = yield _knex.getCustomerCloseSchemeDetails(customer, params === null || params === void 0 ? void 0 : params.data, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
exports.default = customerRouter;
//# sourceMappingURL=customercontroller.js.map