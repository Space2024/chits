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
var reportRouter = express_1.default.Router();
const service_1 = require("../dbmodels/knex/reports/service");
const uris_1 = require("../common/uris");
const _knex = new service_1.ReportService();
let errorMessage = { message: "", code: 0 };
reportRouter.post(`/${uris_1.ReportURIs.GET_DAILY_REPORT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reportParams = req.body;
    const { data, error } = yield _knex.getReportsByBranchAndDate(reportParams, reportParams.branch, reportParams.fromdate, reportParams.todate, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
reportRouter.post(`/${uris_1.ReportURIs.GET_BRANCHWISE_REPORT}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let reportParams = req.body;
    const { data, error } = yield _knex.getReportsByBranch(reportParams, reportParams.branch, reportParams.fromdate, reportParams.todate, errorMessage);
    if ((error === null || error === void 0 ? void 0 : error.code) === 500) {
        res.json({ success: false, data: data, message: error, status: 500 });
    }
    else {
        res.send(JSON.stringify({ success: true, data: data, message: error, status: 200 }, null, 2));
        res.end();
    }
}));
exports.default = reportRouter;
//# sourceMappingURL=reportcontroller.js.map