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
exports.MenuConfigQuery = void 0;
const knex_1 = require("./knex");
const tables_1 = require("./tables");
const procedures_1 = require("../procedures");
const common_1 = require("../../common/common");
class MenuConfigQuery {
    getMenuAccessByDepartment(department) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield knex_1.database
                    .select(tables_1.dbTables.MENUCONFIG.Add, tables_1.dbTables.MENUCONFIG.All, tables_1.dbTables.MENUCONFIG.Delete, tables_1.dbTables.MENUCONFIG.Edit, tables_1.dbTables.MENUCONFIG.View)
                    .from(tables_1.dbTables.MENUCONFIG.TABLENAME)
                    .where(tables_1.dbTables.MENUCONFIG.Department, department);
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryGetAllMachineNames() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield knex_1.database
                    .select("ID as key", "MachineNames as text")
                    .from(tables_1.dbTables.MACHINENAMES.TABLENAME);
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryGetAllMachineNumbersByName(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield knex_1.database
                    .select("ID  as key", "MachineNumbers as text")
                    .from(tables_1.dbTables.MACHINENUMBERS.TABLENAME)
                    .where(tables_1.dbTables.MACHINENUMBERS.MachineNamesId, Id);
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryGetCurrency() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield knex_1.database
                    .where(tables_1.dbTables.CURRENCIES.Isactive, 1)
                    .select(tables_1.dbTables.CURRENCIES.ID, tables_1.dbTables.CURRENCIES.Currency)
                    .from(tables_1.dbTables.CURRENCIES.TABLENAME);
            }
            catch (error) {
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryInsertOTP(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (data.verified === 0) {
                    return yield (0, knex_1.database)(tables_1.dbTables.OTP.TABLENAME).insert(data);
                }
                else {
                    const _data = yield knex_1.database
                        .where(tables_1.dbTables.OTP.CustomerId, data.customerid)
                        .andWhere(tables_1.dbTables.OTP.Otp, data.otp)
                        .andWhere(tables_1.dbTables.OTP.Verified, 0)
                        .select(tables_1.dbTables.OTP.ID)
                        .from(tables_1.dbTables.OTP.TABLENAME);
                    if (_data.length > 0) {
                        yield (0, knex_1.database)(tables_1.dbTables.OTP.TABLENAME)
                            .where(tables_1.dbTables.OTP.CustomerId, data.customerid)
                            .update(data);
                    }
                    return _data;
                }
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryInsertPaymentDetails(data, fullData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const today = new Date();
            const _date = today.getDate();
            try {
                const _payment = data[0];
                const _paymenttypes = data[1];
                const _paymentDetails = data[2];
                const _CustomerId = yield knex_1.database
                    .where("sktmcustomerid", _payment.customerid)
                    .select("customerid")
                    .from("tbl_customer");
                _payment.customerid =
                    _CustomerId.length > 0
                        ? _CustomerId[0].customerid
                        : _payment.customerid;
                _paymenttypes.customerid =
                    _CustomerId.length > 0
                        ? _CustomerId[0].customerid
                        : _payment.customerid;
                const _dataCus = yield knex_1.database
                    // .where("schemeid", _paymenttypes.schemeid)
                    .andWhere("customergroupname", _paymenttypes.customergroupname)
                    .andWhere("customergroupno", _paymenttypes.customergroupno)
                    .andWhere("monthyear", _paymenttypes.monthyear)
                    .select("monthyear")
                    .from("tbl_paymenttypes");
                const _installment = yield knex_1.database
                    .andWhere("customergroupname", _paymenttypes.customergroupname)
                    .andWhere("customergroupno", _paymenttypes.customergroupno)
                    .select("installmentno")
                    .orderBy("installmentno", "desc")
                    .limit(1)
                    .from("tbl_paymenttypes");
                _paymenttypes.installmentno =
                    _installment.length > 0 ? _installment[0].installmentno + 1 : 1;
                const _tranno = yield knex_1.database
                    .max("transactionnumber as transactionnumber")
                    .from("tbl_payments");
                const _emp = yield (0, knex_1.database)("tbl_employee as e")
                    .innerJoin("tbl_branch as eb", "e.branchid", "eb.sno")
                    .select("eb.companyname", "eb.legalname", "e.name")
                    .where("e.ecno", _payment.createdby);
                _payment.transactionnumber =
                    _tranno.length > 0 ? _tranno[0].transactionnumber + 1 : 1;
                _paymentDetails.transactionnumber =
                    _tranno.length > 0 ? _tranno[0].transactionnumber + 1 : 1;
                _paymenttypes.transactionnumber =
                    _tranno.length > 0 ? _tranno[0].transactionnumber + 1 : 1;
                const _dailyPayment = Number(isNaN((_a = Number(_paymentDetails.cardamount)) !== null && _a !== void 0 ? _a : 0)
                    ? 0
                    : _paymentDetails.cardamount) +
                    Number(isNaN((_b = Number(_paymentDetails.cashamount)) !== null && _b !== void 0 ? _b : 0)
                        ? 0
                        : _paymentDetails.cashamount) +
                    Number(isNaN((_c = Number(_paymentDetails.bankamount)) !== null && _c !== void 0 ? _c : 0)
                        ? 0
                        : _paymentDetails.bankamount);
                // DATA FOR WHAT APP
                const _whatapp = {
                    customername: fullData.customername,
                    transactionnumber: _paymenttypes.transactionnumber,
                    schemename: fullData.schemename,
                    groupno: fullData.groupno,
                    schemeamount: fullData.schemename !== "Daily"
                        ? fullData.schemeamount
                        : _dailyPayment,
                    installmentno: _paymenttypes.installmentno,
                    paiddate: `${_date}-${_payment.monthyear}`,
                    employeename: _emp[0].name,
                    org: _emp[0].legalname,
                    companyname: _emp[0].companyname,
                    recipient: fullData.customermobile,
                };
                return yield knex_1.database
                    .transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    if (_dataCus.length > 0 && _paymenttypes.customergroupno > 1) {
                        yield trx("tbl_customerschemes as sc")
                            .innerJoin("tbl_customer as c", "c.sktmcustomerid", "sc.customerid")
                            .where("sc.schemeid", _paymenttypes.schemeid)
                            .andWhere("c.customerid", _payment.customerid)
                            .andWhere("customergroupno", _paymenttypes.customergroupno)
                            .update("twoinstallment", 2);
                    }
                    // Insert into payments
                    yield trx(tables_1.dbTables.PAYMENTS.TABLENAME).insert(_payment);
                    // Insert into payment types
                    yield trx(tables_1.dbTables.PAYMENT_TYPES.TABLENAME).insert(_paymenttypes);
                    // Insert into payment detail
                    yield trx(tables_1.dbTables.PAYMENT_DETAILS.TABLENAME).insert(_paymentDetails);
                    // Commit the transaction
                    yield trx.commit();
                    console.log("Transaction committed successfully");
                }))
                    .then((res) => {
                    (0, common_1.sendPaymentWhatAppMessage)(_whatapp);
                    return {
                        statusCode: 200,
                        message: "success",
                        data: [],
                    };
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
            // });
        });
    }
    queryBulkInsertConfigMenus(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, knex_1.database)(tables_1.dbTables.MENUCONFIG.TABLENAME).insert(data);
            }
            catch (error) {
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    spGetCustomerByMobileNumber(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield knex_1.database.raw(procedures_1.Procedures.Customer.GET, [
                    Number(data),
                ]);
                return result.length > 0 ? result[0] : [];
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryGetSchemesByCustomer(customerid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, knex_1.database)("tbl_customerschemes as sc")
                    .innerJoin("tbl_schemes as s", "s.schemeid", "sc.schemeid")
                    .innerJoin("tbl_group as g", "g.groupname", "sc.groupname")
                    .innerJoin("tbl_customer as c", "c.sktmcustomerid", "sc.customerid")
                    .innerJoin("tbl_branch as b", "b.sno", "c.branchid")
                    .select("sc.id", "s.schemeid", "g.groupid", knex_1.database.raw("case when weighttype = '1' then 'Amount Based Weight' when weighttype = '2' then 'Weight Based Amount' else 'Amount Based Weight' end as schemetype"), "s.schemename", "sc.groupname", "s.installmentamount as schemeamount", "customergroupno as groupnumber", "s.weighttype as weight", knex_1.database.raw("udf_get_receivedinstallment_by_customer(c.customerid,sc.schemeid,sc.customergroupno,sc.groupname) as recievedinstallment"), "twoinstallment", knex_1.database.raw("0 AS ismatured"), knex_1.database.raw("DATE_FORMAT(sc.CreatedDate, '%d-%b-%Y')  AS createddate"), knex_1.database.raw("DATE_FORMAT(sc.maturitydate, '%d-%b-%Y')  AS maturitydate"), "branchname")
                    .where(`c.customerid`, customerid)
                    .andWhere(knex_1.database.raw("DATEDIFF(sc.maturitydate,CURDATE()) >= 0"));
            }
            catch (error) {
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryGetMaturitySchemesByCustomer(cardNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, knex_1.database)("tbl_customerschemes as sc")
                    .innerJoin("tbl_schemes as s", "s.schemeid", "sc.schemeid")
                    .innerJoin("tbl_group as g", "g.groupname", "sc.groupname")
                    .innerJoin("tbl_customer as c", "c.sktmcustomerid", "sc.customerid")
                    .innerJoin("tbl_branch as b", "b.sno", "c.branchid")
                    .select("sc.id", "s.schemeid", "g.groupid", knex_1.database.raw("case when weighttype = '1' then 'Amount Based Weight' when weighttype = '2' then 'Weight Based Amount' else 'Amount Based Weight' end as schemetype"), "s.schemename", "sc.groupname", "s.installmentamount as schemeamount", "customergroupno as groupnumber", "s.weighttype as weight", knex_1.database.raw("udf_get_receivedinstallment_by_customer(c.customerid,sc.schemeid,sc.customergroupno,sc.groupname) as recievedinstallment"), knex_1.database.raw("1 AS ismatured"), knex_1.database.raw("DATE_FORMAT(sc.CreatedDate, '%d-%b-%Y')  AS createddate"), knex_1.database.raw("DATE_FORMAT(sc.maturitydate, '%d-%b-%Y')  AS maturitydate"), "twoinstallment", "linksendcount", "branchname")
                    .where(`c.customerid`, cardNumber)
                    .andWhere(`sc.isclosed`, 0);
                //.andWhere(database.raw("DATEDIFF(sc.maturitydate,CURDATE()) < 0"));
            }
            catch (error) {
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryPaymentHistoryByCustomerScheme(customerid, schemeid, groupno, groupname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _CustomerId = yield knex_1.database
                    .where("sktmcustomerid", customerid)
                    .select("customerid")
                    .from("tbl_customer");
                customerid =
                    _CustomerId.length > 0 ? _CustomerId[0].customerid : customerid;
                const data = yield (0, knex_1.database)("tbl_customerschemes as sc")
                    .innerJoin("tbl_schemes as s", "s.schemeid", "sc.schemeid")
                    .innerJoin("tbl_group as g", "g.groupname", "sc.groupname")
                    .innerJoin("tbl_customer as c", "c.sktmcustomerid", "sc.customerid")
                    .innerJoin("tbl_paymenttypes as pt", function () {
                    this.on("pt.customerid", "=", "c.customerid")
                        .andOn("pt.customergroupno", "=", "sc.customergroupno")
                        .andOn("pt.schemeid", "=", "sc.schemeid");
                })
                    .innerJoin("tbl_paymentdetails as pd", "pd.transactionnumber", "pt.transactionnumber")
                    .innerJoin("tbl_branch as b", "c.branchid", "b.sno")
                    .innerJoin("tbl_branch as br", "pd.paymentbranch", "br.sno")
                    .select("installmentno as installment", "s.schemename", "sc.groupname", "pt.customergroupno as groupnumber", knex_1.database.raw("DATE_FORMAT(pt.paiddate, '%d-%b-%Y')  AS paiddate"), knex_1.database.raw("IFNULL(cardamount, 0) as cardamount"), knex_1.database.raw("IFNULL(cashamount, 0) as cashamount"), knex_1.database.raw("IFNULL(bankamount, 0) as bankamount"), "b.branchname as cusbranch", "br.branchname as paymentbranch")
                    .where(`pt.customerid`, customerid)
                    .andWhere(`pt.schemeid`, schemeid)
                    .andWhere(`pt.customergroupno`, groupno)
                    .andWhere(`sc.groupname`, groupname);
                return data;
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryGraphData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _chart = [];
                let _dataGroup = yield knex_1.database
                    .select("groupname")
                    .sum("customergroupno as totalgroup")
                    .groupBy("groupname")
                    .from("tbl_customerschemes");
                _dataGroup = _dataGroup.map((item) => {
                    return {
                        group: item.groupname.split("-").slice(2, 5).join("-"),
                        total: item.totalgroup,
                    };
                });
                let _datascheme = yield knex_1.database
                    .select("schemename", "installmentamount as schemeamount")
                    .from("tbl_schemes");
                _chart.push(_dataGroup);
                _chart.push(_datascheme);
                return _chart;
            }
            catch (error) {
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    queryCloseCustomerScheme(customerid, schemeid, groupno, mobileno, groupname, createdby, closebranch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _CustomerId = yield knex_1.database
                    .where("customerid", customerid)
                    .select("sktmcustomerid", "customername")
                    .from("tbl_customer");
                const _count = yield (0, knex_1.database)("tbl_customerschemes")
                    .where(`customerid`, _CustomerId[0].sktmcustomerid)
                    .andWhere(`schemeid`, schemeid)
                    .andWhere(`customergroupno`, groupno)
                    .andWhere(`groupname`, groupname)
                    .select("linksendcount", "closekey");
                const _rand = Math.floor(100000 + Math.random() * 90000);
                const _url = `${String(process.env.UI_APP_URL)}/admin/customerschemeclose?mobileno=${mobileno}&key=${_count[0].closekey ? _count[0].closekey : _rand}&schemeid=${schemeid}`;
                const _emp = yield (0, knex_1.database)("tbl_employee as e")
                    .innerJoin("tbl_branch as eb", "e.branchid", "eb.sno")
                    .select("eb.companyname", "eb.legalname", "e.name")
                    .where("e.ecno", createdby);
                console.log(_url);
                // DATA FOR CLOSE LINK
                const _closewhatapp = {
                    customername: _CustomerId[0].customername,
                    link: _url,
                    employeename: _emp[0].name,
                    org: _emp[0].legalname,
                    companyname: _emp[0].companyname,
                    recipient: mobileno,
                };
                (0, common_1.sendCloseLinkWhatAppMessage)(_closewhatapp);
                const data = yield (0, knex_1.database)("tbl_customerschemes")
                    .where(`customerid`, _CustomerId[0].sktmcustomerid)
                    .andWhere(`schemeid`, schemeid)
                    .andWhere(`customergroupno`, groupno)
                    .andWhere(`groupname`, groupname)
                    .update({
                    linksendcount: _count[0].linksendcount + 1,
                    linksenddatetime: knex_1.database.fn.now(),
                    closekey: _count[0].closekey ? _count[0].closekey : _rand,
                    closebranch: closebranch,
                });
                return data;
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    spGetCustomerCloseScheme(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield knex_1.database.raw(procedures_1.Procedures.Customer.GET_CLOSE, [
                    Number(data),
                ]);
                const _sche = yield (0, knex_1.database)("tbl_customerschemes as sc")
                    .innerJoin("tbl_schemes as s", "s.schemeid", "sc.schemeid")
                    .innerJoin("tbl_customer as c", "c.sktmcustomerid", "sc.customerid")
                    .innerJoin("tbl_branch as b", "b.sno", "c.branchid")
                    .where(`sc.closekey`, Number(data))
                    .select("sc.id", "sc.schemeid", "groupname", "customergroupno as groupnumber", "s.weighttype as weight", "s.installmentamount as schemeamount", knex_1.database.raw("udf_get_receivedinstallment_by_customer(c.customerid,sc.schemeid,sc.customergroupno,sc.groupname) as recievedinstallment"), "branchname");
                const updatedRows = result[0][0].map((row) => {
                    row.availableschemes = _sche;
                    return row;
                });
                return updatedRows;
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
    querySubmitCustomerScheme(id, key, mobileno) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _count = yield (0, knex_1.database)("tbl_customerschemes")
                    .where(`id`, id)
                    .andWhere(`closekey`, key)
                    .andWhere(`isclosed`, 0)
                    .select("schemeid");
                if (_count.length > 0) {
                    const data = yield (0, knex_1.database)("tbl_customerschemes")
                        .where(`id`, id)
                        .andWhere(`closekey`, key)
                        .update({
                        isclosed: 1,
                        closeddate: knex_1.database.fn.now(),
                        closedby: mobileno,
                    });
                }
                return _count;
            }
            catch (error) {
                console.log(error);
                throw {
                    statusCode: 500,
                    message: "Something went wrong",
                    data: [],
                };
            }
        });
    }
}
exports.MenuConfigQuery = MenuConfigQuery;
//# sourceMappingURL=query.js.map