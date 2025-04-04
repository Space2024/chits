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
exports.CustomerActions = void 0;
const config_1 = require("../../dbconfig/config");
const knex_1 = require("../knex/knex");
const procedures_1 = require("../procedures");
class CustomerActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const jstr = JSON.stringify(payload);
            const customers = JSON.parse(jstr);
            let proc;
            let params;
            switch (method) {
                case "GET":
                    proc = procedures_1.Procedures.Customer.GET_ALL;
                    break;
                case "PUT":
                case "POST":
                    const _data = yield knex_1.database
                        .where("sktmcustomerid", customers.id)
                        .select("customerid")
                        .from("tbl_customer");
                    if (_data.length > 0) {
                        customers.insert_update = 2;
                        customers.customerid = _data[0].customerid;
                    }
                    proc = procedures_1.Procedures.Customer.POST;
                    params = [
                        customers.customerid,
                        null,
                        isNaN(customers.employeeid) ? 0 : Number(customers.employeeid),
                        customers.gender,
                        Number(customers.mobileNo),
                        customers.religion,
                        customers.email,
                        customers.occupation,
                        null,
                        null,
                        customers.nomineeName,
                        customers.nomineeRelation,
                        Number(customers.nomineeMobile),
                        customers.street,
                        customers.taluk,
                        customers.city,
                        customers.state,
                        Number(customers.pinCode),
                        Number(customers.mobileNo),
                        customers.CreatedBy,
                        customers.ModifiedBy,
                        customers.Isdeleted,
                        customers.deletedBy,
                        null,
                        customers.insert_update,
                        customers.customerName,
                        customers.aadharnumber,
                        isNaN(customers.branch) ? 0 : Number(customers.branch),
                        customers.area,
                        customers.doorNo,
                        customers.schemeid,
                        customers.relationship,
                        customers.photo1,
                        customers.photo2,
                        customers.id,
                        customers.joiningecno,
                    ];
                    break;
                case "DELETE":
                    proc = procedures_1.Procedures.Customer.DELETE;
                    params = [
                        customers.customerid,
                        null,
                        isNaN(customers.employeeid) ? 0 : Number(customers.employeeid),
                        customers.gender,
                        Number(customers.mobileNo),
                        customers.religion,
                        customers.email,
                        customers.occupation,
                        customers.birthdate,
                        customers.anniversarydate,
                        customers.nomineeName,
                        customers.nomineeRelation,
                        Number(customers.nomineeMobile),
                        customers.street,
                        customers.taluk,
                        customers.city,
                        customers.state,
                        Number(customers.pinCode),
                        Number(customers.mobileNo),
                        customers.CreatedBy,
                        customers.ModifiedBy,
                        customers.Isdeleted,
                        customers.deletedBy,
                        null,
                        customers.insert_update,
                        customers.customerName,
                        customers.aadharnumber,
                        null,
                        customers.area,
                        customers.doorNo,
                        customers.schemeid,
                        customers.relationship,
                        customers.photo1,
                        customers.photo2,
                        customers.id,
                    ];
                    break;
                default:
                    proc = procedures_1.Procedures.Customer.GET;
                    // params = [customers.customerid];
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
exports.CustomerActions = CustomerActions;
//# sourceMappingURL=customeraction.js.map