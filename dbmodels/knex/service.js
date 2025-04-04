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
exports.KnexQueryService = void 0;
const query_1 = require("./query");
const _menuConfigQuery = new query_1.MenuConfigQuery();
class KnexQueryService {
    getMenuAccess(data, department, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.getMenuAccessByDepartment(department);
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
    getAllMachineNames(data, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryGetAllMachineNames();
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
    getAllMachineNumbersByName(data, Id, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryGetAllMachineNumbersByName(Id);
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
    getAllCurrency(data, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryGetCurrency();
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
    postOTP(data, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryInsertOTP(data);
            try {
                data = result;
                error = { message: result.length > 0 ? "success" : "invalid", code: 200 };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    InsertPaymentInfo(data, fullData, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryInsertPaymentDetails(data, fullData);
            try {
                data = result;
                error = {
                    message: result.statusCode === 200 ? "success" : "invalid",
                    code: 200,
                };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    BulkInsertMenu(data, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryBulkInsertConfigMenus(data);
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    getCustomerByMobileNumber(data, cardnumber, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.spGetCustomerByMobileNumber(cardnumber);
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                console.log(ex);
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    getCustomerSchemesById(data, customerId, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryGetSchemesByCustomer(customerId);
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    getCustomerMaturitySchemesById(data, cardNumber, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryGetMaturitySchemesByCustomer(cardNumber);
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    getPaymentHistoryByCustomerScheme(data, customerId, schemeId, groupno, groupnname, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryPaymentHistoryByCustomerScheme(customerId, schemeId, groupno, groupnname);
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    getChartData(data, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryGraphData();
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    closeCustomerScheme(data, customerId, schemeId, groupno, mobileno, groupname, createdby, closebranch, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.queryCloseCustomerScheme(customerId, schemeId, groupno, mobileno, groupname, createdby, closebranch);
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    getCustomerCloseSchemeDetails(data, schemeId, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.spGetCustomerCloseScheme(schemeId);
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                console.log(ex);
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
    submitCustomerApproveRedeem(data, id, key, mobileno, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield _menuConfigQuery.querySubmitCustomerScheme(id, key, mobileno);
            try {
                data = result;
                error = {
                    message: "success",
                    code: 200,
                };
            }
            catch (ex) {
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            return { data, error };
        });
    }
}
exports.KnexQueryService = KnexQueryService;
//# sourceMappingURL=service.js.map