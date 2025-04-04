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
exports.ConcernActions = void 0;
const common_1 = require("../../common/common");
const config_1 = require("../../dbconfig/config");
const procedures_1 = require("../procedures");
class ConcernActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const jstr = JSON.stringify(payload);
            let concerns = JSON.parse(jstr);
            concerns.yearcode = (0, common_1.getIndianFinancialYear)();
            let proc;
            let params;
            console.log(concerns);
            switch (method) {
                case "GET":
                    proc = procedures_1.Procedures.Concern.GET;
                    // params = [Number(concerns.concernid)];
                    break;
                case "PUT":
                case "POST":
                    proc = procedures_1.Procedures.Concern.POST;
                    params = [
                        concerns.concernid,
                        concerns.companycode,
                        concerns.companyname,
                        concerns.companytype,
                        concerns.ownerpartnername,
                        concerns.yearcode,
                        concerns.doornumber,
                        concerns.street,
                        concerns.taluk,
                        concerns.city,
                        concerns.state,
                        concerns.country,
                        Number(concerns.pincode),
                        Number(concerns.mobilenumber),
                        Number(concerns.landlinenumber),
                        concerns.faxnumber,
                        concerns.gstn,
                        concerns.tan,
                        concerns.cin,
                        concerns.pan,
                        concerns.msme,
                        concerns.CreatedBy,
                        concerns.ModifiedBy,
                        concerns.Isdeleted,
                        concerns.deletedBy,
                        concerns.deletedDate,
                        concerns.insert_update,
                        concerns.area,
                    ];
                    break;
                case "DELETE":
                    proc = procedures_1.Procedures.Concern.DELETE;
                    params = [
                        concerns.concernid,
                        concerns.companycode,
                        concerns.companyname,
                        concerns.companytype,
                        concerns.ownerpartnername,
                        concerns.yearcode,
                        concerns.doornumber,
                        concerns.street,
                        concerns.taluk,
                        concerns.city,
                        concerns.state,
                        concerns.country,
                        Number(concerns.pincode),
                        Number(concerns.mobilenumber),
                        Number(concerns.landlinenumber),
                        concerns.faxnumber,
                        concerns.gstn,
                        concerns.tan,
                        concerns.cin,
                        concerns.pan,
                        concerns.msme,
                        concerns.CreatedBy,
                        concerns.ModifiedBy,
                        concerns.Isdeleted,
                        concerns.deletedBy,
                        concerns.deletedDate,
                        concerns.insert_update,
                        concerns.area,
                    ];
                    break;
                default:
                    proc = procedures_1.Procedures.Concern.GET;
                    // params = [  concerns.concernid];
                    break;
            }
            const con = yield (0, config_1.ConnectDB)();
            try {
                const [rows] = yield con.query(proc, params);
                data = rows;
                error = { message: "success", code: 200 };
            }
            catch (ex) {
                console.log(ex);
                data = data;
                error = { message: ex === null || ex === void 0 ? void 0 : ex.code, code: 500 };
            }
            finally {
                yield con.end();
            }
            return { data, error };
        });
    }
}
exports.ConcernActions = ConcernActions;
//# sourceMappingURL=concernsactions.js.map