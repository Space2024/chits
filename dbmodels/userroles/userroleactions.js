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
exports.UserRoleActions = void 0;
const config_1 = require("../../dbconfig/config");
const procedures_1 = require("../procedures");
class UserRoleActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const jstr = JSON.stringify(payload);
            const userrole = jstr ? JSON.parse(jstr) : "";
            let proc;
            let params;
            console.log(method, jstr);
            switch (method) {
                case "GET":
                    proc = procedures_1.Procedures.UserRoles.GET;
                    break;
                case "PUT":
                case "POST":
                    proc = procedures_1.Procedures.UserRoles.POST;
                    params = [
                        userrole.userroleid,
                        userrole.concernid,
                        userrole.role,
                        userrole.isactive,
                        userrole.insert_update,
                    ];
                    break;
                default:
                    proc = procedures_1.Procedures.UserRoles.GET;
                    break;
            }
            const con = yield (0, config_1.ConnectDB)();
            try {
                const [rows] = yield con.query(proc, params);
                data = rows;
                error = { message: "success", code: 200 };
            }
            catch (ex) {
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
exports.UserRoleActions = UserRoleActions;
//# sourceMappingURL=userroleactions.js.map