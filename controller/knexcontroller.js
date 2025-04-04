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
var knexQueryRouter = express_1.default.Router();
const uris_1 = require("../common/uris");
const common_1 = require("../common/common");
const service_1 = require("../dbmodels/knex/service");
const https_1 = __importDefault(require("https"));
var PaytmChecksum = require("./PaytmChecksum");
const _knex = new service_1.KnexQueryService();
let errorMessage = { message: "", code: 0 };
knexQueryRouter.get(`/${uris_1.ConfigMenuURIs.GET_ALL_MACHINENAMES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let menus = req.body;
    const { data, error } = yield _knex.getAllMachineNames(menus, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.get(`/${uris_1.ConfigMenuURIs.GET_ALL_MACHINENUMBERS_BY_MACHINENAME}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let menus = req.body;
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    const { data, error } = yield _knex.getAllMachineNumbersByName(menus, params === null || params === void 0 ? void 0 : params.data, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.get(`/${uris_1.ConfigMenuURIs.GET_ALL_CURRENCY}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let curr = req.body;
    const { data, error } = yield _knex.getAllCurrency(curr, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.post(`/${uris_1.ConfigMenuURIs.INSERT_OTP}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let otp = req.body;
    const { data, error } = yield _knex.postOTP(otp, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.post(`/${uris_1.PaymentURIs.INSERT_PAYMENT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let _paymentall = req.body;
    const _data = [];
    const _payment = {
        customerid: _paymentall.customerid,
        monthyear: _paymentall.monthyear,
        transactionnumber: _paymentall.transactionumber,
        createdby: _paymentall.createdby,
    };
    const _paymenttypes = {
        transactionnumber: _paymentall.transactionumber,
        monthyear: _paymentall.monthyear,
        cardpayment: _paymentall.cardPayment,
        cashpayment: _paymentall.cashPayment,
        bankpayment: _paymentall.bankPayment,
        schemeid: _paymentall.schemeid,
        customerid: _paymentall.customerid,
        customergroupno: _paymentall.groupno,
        goldrate: _paymentall.goldrate,
        customergroupname: _paymentall.groupname,
    };
    const _paymentdetails = {
        transactionnumber: _paymentall.transactionumber,
        monthyear: _paymentall.monthyear,
        cardtype: _paymentall.cardtype,
        machinename: _paymentall.machinename,
        machinenumber: _paymentall.machinenumber,
        cardnumber: _paymentall.cardnumber,
        cardamount: _paymentall.cardamount,
        cashamount: _paymentall.cashamount,
        bankamount: _paymentall.bankamount,
        referencenumber: _paymentall.referencenumber,
        bankname: _paymentall.bankname,
        denomination: _paymentall.denomination,
        paymentbranch: Number(_paymentall.paymentbranch),
        debitorcreditcard: _paymentall.debitorcreditcard,
    };
    _data.push(_payment);
    _data.push(_paymenttypes);
    _data.push(_paymentdetails);
    const { data, error } = yield _knex.InsertPaymentInfo(_data, _paymentall, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.get(`/${uris_1.CustomerURIS.GET_CUSTOMER_SCHEMES}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cusschemes = req.body;
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    const { data, error } = yield _knex.getCustomerSchemesById(cusschemes, Number(params === null || params === void 0 ? void 0 : params.data), errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.get(`/${uris_1.CustomerURIS.GET_CUSTOMER_MATURITY_SCHEME}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cusschemes = req.body;
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    const { data, error } = yield _knex.getCustomerMaturitySchemesById(cusschemes, Number(params === null || params === void 0 ? void 0 : params.data), errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.get(`/${uris_1.CustomerURIS.GET_CUSTOMER_PAYMENT_HISTORY}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let paymentHis = req.body;
    const params = JSON.parse(JSON.stringify(url_1.default.parse(req.url, true).query));
    const _queryParam = params === null || params === void 0 ? void 0 : params.data.split("~");
    const { data, error } = yield _knex.getPaymentHistoryByCustomerScheme(paymentHis, Number(_queryParam[0]), Number(_queryParam[1]), Number(_queryParam[2]), String(_queryParam[3]), errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.post(`/${uris_1.CustomerURIS.GET_CUSTOMER_CLOSE_SCHEME}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let paymentHis = req.body;
    console.log(paymentHis);
    const { data, error } = yield _knex.closeCustomerScheme(paymentHis, Number(paymentHis.customerid), Number(paymentHis.schemeid), Number(paymentHis.groupnumber), Number(paymentHis.mobileno), String(paymentHis.groupname), Number(paymentHis.createdby), Number(paymentHis.closebranch), errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.post(`/${uris_1.CommonURIs.POST_CUSTOMER_FINAL_APPROVE}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let paymentHis = req.body;
    console.log(paymentHis);
    const { data, error } = yield _knex.submitCustomerApproveRedeem(paymentHis, Number(paymentHis.id), Number(paymentHis.key), Number(paymentHis.mobileno), errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
knexQueryRouter.post(`/${uris_1.CommonURIs.PAYTM_PAYMENT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let paytmParams = {};
    let params = {};
    let _paymentall = req.body;
    console.log(_paymentall);
    const merchantTransactionId = `SKTMCBE${String(Math.floor(10000000 + Math.random() * 90000000))}`;
    const _paytmMid = "SreeKu73966647319041";
    const mKey = "6QJLTvGM1kG44juX";
    const _paytmTid = "25865798";
    const date = new Date();
    const todaysDate = date
        .toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })
        .replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}):(\d{2}):(\d{2})/, "$3-$2-$1 $4:$5:$6");
    // Prepare params which talks with paytm machine
    params["merchantTransactionId"] = merchantTransactionId;
    params["paytmMid"] = _paytmMid;
    params["paytmTid"] = _paytmTid;
    params["transactionAmount"] = String(`${_paymentall.cardamount}00`);
    params["transactionDateTime"] = todaysDate;
    // Generate checksum for given payload
    PaytmChecksum.generateSignature(params, mKey).then(function (checksum) {
        return __awaiter(this, void 0, void 0, function* () {
            paytmParams.body = params;
            paytmParams.head = {
                channelId: "EDC",
                checksum: checksum,
                requestTimeStamp: todaysDate,
                version: "3.1",
            };
            var post_data = JSON.stringify(paytmParams);
            var options = {
                hostname: "securegw-edc.paytm.in",
                path: `/ecr/payment/request`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": post_data.length,
                },
            };
            var response = "";
            let payconfirmResponse;
            // pass payload with checksum to paytm machine
            var post_req = https_1.default.request(options, function (post_res) {
                post_res.on("data", function (chunk) {
                    response += chunk;
                });
                // Get the response from paytm machine eith Accpet/ Reject
                post_res.on("end", function () {
                    var _a, _b;
                    // Check if the request has been accecpted by paytm machine
                    if (((_b = (_a = JSON.parse(response)) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.resultInfo.resultStatus) ===
                        "ACCEPTED_SUCCESS") {
                        // Get the final response for payment is success or failure
                        let finalparams = {};
                        let paytmFinalParams = {};
                        finalparams["merchantTransactionId"] = merchantTransactionId;
                        finalparams["paytmMid"] = _paytmMid;
                        finalparams["paytmTid"] = _paytmTid;
                        finalparams["transactionDateTime"] = todaysDate;
                        PaytmChecksum.generateSignature(finalparams, mKey).then(function (checksumfin) {
                            return __awaiter(this, void 0, void 0, function* () {
                                paytmFinalParams.body = finalparams;
                                paytmFinalParams.head = {
                                    channelId: "EDC",
                                    checksum: checksumfin,
                                    requestTimeStamp: todaysDate,
                                    version: "3.1",
                                };
                                var post_final_data = JSON.stringify(paytmFinalParams);
                                (0, common_1.makeFinalPaytmApiCall)("https://securegw-edc.paytm.in/ecr/V2/payment/status", post_final_data)
                                    .then((data) => {
                                    res.send(JSON.stringify({ success: true, data: data, message: data, status: 200 }, null, 2));
                                    res.end();
                                })
                                    .catch((err) => console.error(err.message));
                            });
                        });
                    }
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    });
}));
exports.default = knexQueryRouter;
//# sourceMappingURL=knexcontroller.js.map