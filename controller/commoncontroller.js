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
var commonRouter = express_1.default.Router();
const commonactions_1 = require("../dbmodels/common/commonactions");
const uris_1 = require("../common/uris");
const service_1 = require("../dbmodels/knex/service");
const knex_1 = require("../dbmodels/knex/knex");
const customeraction_1 = require("../dbmodels/customers/customeraction");
const groupactions_1 = require("../dbmodels/group/groupactions");
const _employeeaction = new commonactions_1.EmployeeActions();
const _branchaction = new commonactions_1.BranchActions();
const _dashboardaction = new commonactions_1.DashBoardActions();
const _logindaction = new commonactions_1.LoginActions();
const _dropdowns = new commonactions_1.DropdownsActions();
const _giftschemedetails = new commonactions_1.ChitGiftSchemeActions();
const _knex = new service_1.KnexQueryService();
const _customeraction = new customeraction_1.CustomerActions();
const group = new groupactions_1.GroupActions();
let errorMessage = { message: "", code: 0 };
commonRouter.get(`/${uris_1.CommonURIs.GET_ALL_EMPLOYEES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let emplyee = {
        branchname: "",
        department: "",
        companyname: "",
        designation: "",
        division: "",
        ecno: 0,
        isdeleted: "No",
        name: "",
        yearcode: "",
    };
    const { data, error } = yield _employeeaction.PrepareQuery("GET", emplyee, emplyee, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
commonRouter.post(`/${uris_1.CommonURIs.EMPLOYEE_BULK_INSERT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allEmployees = req.body;
    let message = "";
    yield _employeeaction
        .PrepareBulkInsertQuery(allEmployees, "tbl_employee")
        .then((res) => {
        message = "success";
    })
        .catch((err) => {
        message = err;
    });
    res.send(JSON.stringify({ success: true, data: null, message: message, status: 200 }, null, 2));
    res.end();
}));
commonRouter.post(`/${uris_1.CommonURIs.CUSTOMER_BULK_INSERT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allCustomer = req.body;
    let message = "";
    allCustomer.forEach((_customer) => __awaiter(void 0, void 0, void 0, function* () {
        let customers = _customer;
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
        const { data, error } = yield _customeraction.PrepareQuery("POST", customers, customers, errorMessage);
        if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
            res.json({ success: false, data: data, message: error, status: 500 });
        }
        else {
            if (_data.length === 0) {
                const { data, error } = yield group.PrepareQuery("POST", _group, _group, errorMessage);
            }
        }
    }));
    res.send(JSON.stringify({ success: true, data: null, message: message, status: 200 }, null, 2));
    res.end();
}));
//
commonRouter.put(`/${uris_1.CommonURIs.EMPLOYEE_BULK_UPDATE}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allEmployees = req.body;
    let message = "";
    console.log(allEmployees);
    yield _employeeaction
        .PrepareBulkUpdateQuery(allEmployees, "tbl_employee")
        .then((res) => {
        message = "success";
    })
        .catch((err) => {
        message = err;
    });
    res.send(JSON.stringify({ success: true, data: null, message: message, status: 200 }, null, 2));
    res.end();
}));
commonRouter.get(`/${uris_1.CommonURIs.GET_ALL_BRANCHES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let branch = {
        companyname: "",
        legalname: "",
        branchcode: "",
        branchname: "",
        designation: "",
        yearcode: "",
        street: "",
        taluk: "",
        city: "",
        state: "",
        country: "",
        pincode: 0,
        mobile: 0,
        landline: 0,
        fax: "",
        gstn: "",
        tan: "",
        cin: "",
        pan: "",
        msme: "",
    };
    const { data, error } = yield _branchaction.PrepareQuery("GET", branch, branch, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
commonRouter.post(`/${uris_1.CommonURIs.BRANCH_BULK_INSERT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allbranchess = req.body;
    let message = "";
    yield _branchaction
        .PrepareBulkInsertQuery(allbranchess, "tbl_branch")
        .then((res) => {
        message = "success";
    })
        .catch((err) => {
        message = err;
    });
    res.send(JSON.stringify({ success: true, data: null, message: message, status: 200 }, null, 2));
    res.end();
}));
commonRouter.put(`/${uris_1.CommonURIs.BRANCH_BULK_UPDATE}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allbranchess = req.body;
    let message = "";
    yield _branchaction
        .PrepareBulkUpdateQuery(allbranchess, "tbl_branch")
        .then((res) => {
        message = "success";
    })
        .catch((err) => {
        message = err;
    });
    res.send(JSON.stringify({ success: true, data: null, message: message, status: 200 }, null, 2));
    res.end();
}));
commonRouter.get(`/${uris_1.CommonURIs.GET_ALL_DASHBOARD_COUNTS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dashboard = req.body;
    const { data, error } = yield _dashboardaction.PrepareQuery("GET", dashboard, dashboard, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
commonRouter.post(`/${uris_1.CommonURIs.VALIDATE_LOGIN}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let login = req.body;
    let emplyee = {
        branchname: "",
        department: "",
        companyname: "",
        designation: "",
        division: "",
        ecno: 0,
        isdeleted: "No",
        name: "",
        yearcode: "",
    };
    console.log(login);
    const { data, error } = yield _logindaction.PrepareQuery("POST", emplyee, login, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
commonRouter.get(`/${uris_1.CommonURIs.GET_ALL_DROPDWONS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let dashboard = req.body;
    const { data, error } = yield _dropdowns.PrepareQuery("GET", dashboard, undefined, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
commonRouter.get(`/${uris_1.CommonURIs.GET_SCHEME_DETAILS_BY_CUSTOMERNUMBER}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    console.log(params);
    let giftscheme = { cardnumber: params === null || params === void 0 ? void 0 : params.data };
    console.log(giftscheme);
    const { data, error } = yield _giftschemedetails.PrepareQuery("GET", giftscheme, params, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
commonRouter.post(`/${uris_1.CommonURIs.MENU_CONFIGS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let menus = req.body;
    const { data, error } = yield _knex.BulkInsertMenu(menus, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
commonRouter.post(`/${uris_1.CommonURIs.SEND_OTP}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _data = req.body;
    try {
        let headers = new Headers();
        headers.set("Authorization", "Basic " +
            btoa("SPACE_TEXT_m1LjoskszWEzsPjWaoMK" + ":" + "m1LjoskszWEzsPjWaoMK"));
        headers.set("Access-Control-Allow-Origin", "*");
        headers.set("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
        const requestOptions = {
            method: "GET",
            headers: headers,
        };
        yield fetch(`https://iqsms.airtel.in/api/v1/send-sms?customerId=SPACE_TEXT_m1LjoskszWEzsPjWaoMK&entityId=1701158071847889480&destinationAddress=${_data.mobileno}&message=Dear Customer,Kindly update OTP:${_data.otp} with our Chit Cashier for Duplicate Card generate. Group No:test .Thank U!.SKTM&sourceAddress=SPCTXL&messageType=SERVICE_IMPLICIT&dltTemplateId=1707161517965935069`, requestOptions)
            .then((res) => {
            console.log(res);
        })
            .catch((err) => {
            console.log(err);
        });
        let _otp = {
            customerid: _data.customerid,
            otp: _data.otp,
            verified: 0,
        };
        const { data, error } = yield _knex.postOTP(_otp, errorMessage);
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
    catch (error) {
        console.error("Error generating OTP:", error);
        res.json({ success: false, data: null, message: error, status: 500 });
    }
}));
commonRouter.get(`/${uris_1.CommonURIs.GET_CHARTS}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield _knex.getChartData([], errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
exports.default = commonRouter;
//# sourceMappingURL=commoncontroller.js.map