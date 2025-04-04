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
exports.EmployeeBulkInsertActions = exports.ChitGiftSchemeActions = exports.DropdownsActions = exports.LoginActions = exports.DashBoardActions = exports.BranchActions = exports.EmployeeActions = void 0;
const knex_1 = __importDefault(require("knex"));
const config_1 = require("../../dbconfig/config");
const procedures_1 = require("../procedures");
class EmployeeActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let proc = procedures_1.Procedures.Common.EMPLOYEES_GET;
            const con = yield (0, config_1.ConnectDB)();
            try {
                const [rows] = yield con.query(proc);
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
    PrepareBulkInsertQuery(data, tablename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const database = (0, knex_1.default)({
                    client: "mysql",
                    connection: {
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                    },
                });
                database(tablename)
                    .insert(data)
                    .then((res) => {
                    resolve(res);
                })
                    .catch((err) => {
                    reject(err.sqlMessage);
                });
            });
        });
    }
    PrepareBulkUpdateQuery(data, tablename) {
        return __awaiter(this, void 0, void 0, function* () {
            // return new Promise((resolve, reject) => {
            const database = (0, knex_1.default)({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                },
            });
            return database.transaction((trx) => {
                const queries = data.map((item) => database(tablename)
                    .where("sno", item === null || item === void 0 ? void 0 : item.sno)
                    .update(item)
                    .transacting(trx));
                return Promise.all(queries).then(trx.commit).catch(trx.rollback);
            });
            // });
        });
    }
}
exports.EmployeeActions = EmployeeActions;
class BranchActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let proc = procedures_1.Procedures.Common.BRANCHS_GET;
            const con = yield (0, config_1.ConnectDB)();
            try {
                const [rows] = yield con.query(proc);
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
    PrepareBulkInsertQuery(data, tablename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let message = "";
                const branch = [], address = [];
                data.forEach((item) => {
                    let sno = Math.floor(100000 + Math.random() * 90000);
                    let _branch = {
                        companyname: undefined,
                        legalname: undefined,
                        branchcode: undefined,
                        branchname: undefined,
                        yearcode: undefined,
                        sno: sno,
                    }, _address = {
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
                        branchid: sno,
                    };
                    for (const [key, value] of Object.entries(item)) {
                        if (key === "companyname") {
                            _branch.companyname = value;
                        }
                        else if (key === "legalname") {
                            _branch.legalname = value;
                        }
                        else if (key === "branchcode") {
                            _branch.branchcode = value;
                        }
                        else if (key === "branchname") {
                            _branch.branchname = value;
                        }
                        else if (key === "yearcode") {
                            _branch.yearcode = value;
                        }
                        else if (key === "street") {
                            _address.street = value;
                        }
                        else if (key === "taluk") {
                            _address.taluk = value;
                        }
                        else if (key === "city") {
                            _address.city = value;
                        }
                        else if (key === "state") {
                            _address.state = value;
                        }
                        else if (key === "country") {
                            _address.country = value;
                        }
                        else if (key === "pincode") {
                            _address.pincode = value;
                        }
                        else if (key === "mobile") {
                            _address.mobile = value;
                        }
                        else if (key === "landline") {
                            _address.landline = value;
                        }
                        else if (key === "fax") {
                            _address.fax = value;
                        }
                        else if (key === "gstn") {
                            _address.gstn = value;
                        }
                        else if (key === "tan") {
                            _address.tan = value;
                        }
                        else if (key === "cin") {
                            _address.cin = value;
                        }
                        else if (key === "pan") {
                            _address.pan = value;
                        }
                        else if (key === "msme") {
                            _address.msme = value;
                        }
                    }
                    address.push(_address);
                    branch.push(_branch);
                });
                console.log(branch);
                console.log(address);
                const database = (0, knex_1.default)({
                    client: "mysql",
                    connection: {
                        host: process.env.DB_HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                    },
                });
                // database(tablename)
                //   .insert(data)
                //   .then((res) => {
                //     resolve(res);
                //   })
                //   .catch((err) => {
                //     reject(err.sqlMessage);
                //   });
                try {
                    yield database
                        .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                        // Insert into the first table
                        yield trx("tbl_branch").insert(branch);
                        // Insert into the second table
                        yield trx("tbl_address").insert(address);
                        // You can insert into as many tables as needed within the transaction
                    }))
                        .then((res) => {
                        resolve(res);
                    });
                    console.log("Bulk insert completed successfully");
                }
                catch (error) {
                    console.error("Error during bulk insert:", error);
                    reject(error);
                }
                finally {
                    database.destroy(); // Always ensure you close the connection pool after use
                }
            }));
        });
    }
    PrepareBulkUpdateQuery(data, tablename) {
        return __awaiter(this, void 0, void 0, function* () {
            // return new Promise(async (resolve, reject) => {
            let message = "";
            const branch = [], address = [];
            data.forEach((item) => {
                let _branch = {
                    companyname: undefined,
                    legalname: undefined,
                    branchcode: undefined,
                    branchname: undefined,
                    yearcode: undefined,
                    sno: undefined,
                }, _address = {
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
                    branchid: undefined,
                };
                for (const [key, value] of Object.entries(item)) {
                    _branch.sno = item.sno;
                    _address.branchid = item.sno;
                    if (key === "companyname") {
                        _branch.companyname = value;
                    }
                    else if (key === "legalname") {
                        _branch.legalname = value;
                    }
                    else if (key === "branchcode") {
                        _branch.branchcode = value;
                    }
                    else if (key === "branchname") {
                        _branch.branchname = value;
                    }
                    else if (key === "yearcode") {
                        _branch.yearcode = value;
                    }
                    else if (key === "street") {
                        _address.street = value;
                    }
                    else if (key === "taluk") {
                        _address.taluk = value;
                    }
                    else if (key === "city") {
                        _address.city = value;
                    }
                    else if (key === "state") {
                        _address.state = value;
                    }
                    else if (key === "country") {
                        _address.country = value;
                    }
                    else if (key === "pincode") {
                        _address.pincode = value;
                    }
                    else if (key === "mobile") {
                        _address.mobile = value;
                    }
                    else if (key === "landline") {
                        _address.landline = value;
                    }
                    else if (key === "fax") {
                        _address.fax = value;
                    }
                    else if (key === "gstn") {
                        _address.gstn = value;
                    }
                    else if (key === "tan") {
                        _address.tan = value;
                    }
                    else if (key === "cin") {
                        _address.cin = value;
                    }
                    else if (key === "pan") {
                        _address.pan = value;
                    }
                    else if (key === "msme") {
                        _address.msme = value;
                    }
                }
                address.push(_address);
                branch.push(_branch);
            });
            const database = (0, knex_1.default)({
                client: "mysql",
                connection: {
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                },
            });
            try {
                yield database.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    for (const item of branch) {
                        yield trx("tbl_branch").where("sno", Number(item === null || item === void 0 ? void 0 : item.sno)).update(item);
                    }
                    for (const item of address) {
                        yield trx("tbl_address")
                            .where("branchid", Number(item === null || item === void 0 ? void 0 : item.branchid))
                            .update(item);
                    }
                }));
                console.log("Bulk update completed successfully");
            }
            catch (error) {
                console.error("Error during bulk insert:", error);
            }
            finally {
                database.destroy(); // Always ensure you close the connection pool after use
            }
        });
    }
}
exports.BranchActions = BranchActions;
class DashBoardActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let proc = procedures_1.Procedures.Common.DASHBOARD_COUNT_GET;
            const con = yield (0, config_1.ConnectDB)();
            try {
                const [rows] = yield con.query(proc);
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
exports.DashBoardActions = DashBoardActions;
class LoginActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const jstr = JSON.stringify(payload);
            const login = JSON.parse(jstr);
            let proc = procedures_1.Procedures.Common.LOGIN;
            let params = [Number(login.empid), login.password];
            const con = yield (0, config_1.ConnectDB)();
            try {
                const [rows] = yield con.query(proc, params);
                console.log(rows);
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
exports.LoginActions = LoginActions;
class DropdownsActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let proc = procedures_1.Procedures.Common.DROPDOWNS;
            const con = yield (0, config_1.ConnectDB)();
            try {
                const [rows] = yield con.query(proc);
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
exports.DropdownsActions = DropdownsActions;
class ChitGiftSchemeActions {
    PrepareQuery(method, data, payload, error) {
        return __awaiter(this, void 0, void 0, function* () {
            let proc = procedures_1.Procedures.Common.CHIT_GIFT_SCHEME_DETAILS;
            let params = [payload === null || payload === void 0 ? void 0 : payload.data];
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
exports.ChitGiftSchemeActions = ChitGiftSchemeActions;
class EmployeeBulkInsertActions {
}
exports.EmployeeBulkInsertActions = EmployeeBulkInsertActions;
//# sourceMappingURL=commonactions.js.map