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
exports.EmployeeConfigMenuActions = void 0;
const config_1 = require("../../dbconfig/config");
const procedures_1 = require("../procedures");
class EmployeeConfigMenuActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const jstr = JSON.stringify(payload);
            const configmenus = jstr ? JSON.parse(jstr) : "";
            let proc;
            let params;
            switch (method) {
                case "GET":
                    proc = procedures_1.Procedures.ConfigMenus.GET;
                    params = [configmenus.department];
                    break;
                case "PUT":
                case "POST":
                    proc = procedures_1.Procedures.ConfigMenus.POST;
                    params = [
                        configmenus.department,
                        configmenus.menuname,
                        configmenus.all,
                        configmenus.view,
                        configmenus.add,
                        configmenus.edit,
                        configmenus.delete,
                    ];
                    break;
                default:
                    proc = procedures_1.Procedures.ConfigMenus.GET;
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
exports.EmployeeConfigMenuActions = EmployeeConfigMenuActions;
//# sourceMappingURL=employeeconfigmenuactions.js.map