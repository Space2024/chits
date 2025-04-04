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
exports.makeFinalPaytmApiCall = exports.sendCloseLinkWhatAppMessage = exports.sendPaymentWhatAppMessage = exports.getIndianFinancialYear = exports.MSG_Failure = void 0;
const axios_1 = __importDefault(require("axios"));
exports.MSG_Failure = `Try again after some time`;
const getIndianFinancialYear = () => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let financialYearStart = currentMonth >= 4 ? currentYear : currentYear - 1;
    let financialYearEnd = financialYearStart + 1;
    return financialYearStart + "-" + financialYearEnd;
};
exports.getIndianFinancialYear = getIndianFinancialYear;
const sendPaymentWhatAppMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const _receipt = `${data.schemename}/${data.groupno}`;
    const _org = `${data.org}/${data.companyname}`;
    const whatsappMessage = {
        templateId: process.env.WHATSAPP_PAYMENT_TEMPLATE,
        to: String(data.recipient),
        from: String(process.env.WHATSAPP_SENDER),
        message: {
            text: `Dear ${data.customername}, We are pleased to inform you that we have received your payment for this month's chit contribution.
      Details of the Payment:
      Receipt Number: ${String(data.transactionnumber)}
      Chit Scheme/Account Number: ${_receipt}
      Amount Paid: ${String(data.schemeamount)}
      Installment: ${String(data.installmentno)}
      Date of Payment: ${data.paiddate}

      Thank you for your prompt payment. Please keep this receipt number for future reference.

      Should you have any questions, feel free to reach out.

      Best regards,
      ${data.employeename}
      ${_org}
      ${data.recipient}`,
            variables: [
                data.customername,
                String(data.transactionnumber),
                _receipt,
                String(data.schemeamount),
                String(data.installmentno),
                data.paiddate,
                data.employeename,
                _org,
                String(data.recipient),
            ],
            payload: [
                "payload1",
                "payload2",
                "payload3",
                "payload4",
                "payload5",
                "payload6",
                "payload7",
                "payload8",
                "payload9",
            ],
        },
    };
    const response = yield sendWhatAppMessage(whatsappMessage);
    console.log(response.data);
});
exports.sendPaymentWhatAppMessage = sendPaymentWhatAppMessage;
const sendCloseLinkWhatAppMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const _org = `${data.org}/${data.companyname}`;
    const whatsappMessage = {
        templateId: process.env.WHATSAPP_SCHEME_CLOSE_TEMPLATE,
        to: String(data.recipient),
        from: String(process.env.WHATSAPP_SENDER),
        message: {
            text: `Dear ${data.customername}, 
      We would like to inform you that your chit scheme has been successfully closed.
      Please find the link below for all relevant details regarding the closure:
      <a href='${data.link}' target='_blank'>Click here to view</a>

      If you have any questions or require further assistance, don't hesitate to get in touch with us. We’re here to help!

      Thank you for being a valued participant in our chit scheme.

      Best regards,
      ${data.employeename}
      ${_org}
      ${data.recipient}`,
            variables: [
                data.customername,
                data.link,
                data.employeename,
                _org,
                String(data.recipient),
            ],
            payload: ["payload1", "payload2", "payload3", "payload4", "payload5"],
        },
    };
    const response = yield sendWhatAppMessage(whatsappMessage);
    console.log(response.data);
});
exports.sendCloseLinkWhatAppMessage = sendCloseLinkWhatAppMessage;
const sendWhatAppMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.post("https://iqwhatsapp.airtel.in/gateway/airtel-xchange/basic/whatsapp-manager/v1/template/send", JSON.stringify(message), {
        headers: { "Content-Type": "application/json" },
        auth: {
            username: String(process.env.WHATSAPP_USERNAME),
            password: String(process.env.WHATSAPP_PASSWORD),
        },
    });
});
const makeFinalPaytmApiCall = (url_1, data_1, ...args_1) => __awaiter(void 0, [url_1, data_1, ...args_1], void 0, function* (url, data, maxRetries = 10, interval = 3000) {
    let attempt = 0;
    const invokePaytmStatusAPI = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`Attempt ${attempt + 1}...`);
            const response = yield axios_1.default.post(url, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.data) {
                if (response.data.body.resultInfo.resultStatus === "PENDING") {
                    attempt++;
                    return invokePaytmStatusAPI();
                }
                else {
                    return response.data;
                }
            }
        }
        catch (error) {
            console.log(`No response, retrying... (${attempt + 1}/${maxRetries})`);
        }
        attempt++;
        if (attempt < maxRetries) {
            yield new Promise((resolve) => setTimeout(resolve, interval));
            return invokePaytmStatusAPI();
        }
        else {
            throw new Error("Max retries reached without response");
        }
    });
    return invokePaytmStatusAPI();
});
exports.makeFinalPaytmApiCall = makeFinalPaytmApiCall;
//# sourceMappingURL=common.js.map