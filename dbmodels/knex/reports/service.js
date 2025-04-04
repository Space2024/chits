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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const query_1 = require("./query");
const reportQuery = new query_1.ReportQuery();
class ReportService {
    getReportsByBranchAndDate(data, branch, fromDate, toDate, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield reportQuery.getQueryReportsByBranchAndDate(branch, fromDate, toDate);
            try {
                data = result;
                error = { message: "success", code: 200 };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    getReportsByBranch(data, branch, fromDate, toDate, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield reportQuery.getQueryReportsByBranch(branch, fromDate, toDate);
            try {
                data = result;
                error = { message: "success", code: 200 };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
}
exports.ReportService = ReportService;
//# sourceMappingURL=service.js.map