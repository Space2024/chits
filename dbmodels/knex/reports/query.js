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
exports.ReportQuery = void 0;
const knex_1 = require("../knex");
class ReportQuery {
    getQueryReportsByBranchAndDate(branch, fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, knex_1.database)("tbl_paymentdetails as pd")
                    .innerJoin("tbl_paymenttypes as pt", "pd.transactionnumber", "pt.transactionnumber")
                    .andWhere("pd.paymentbranch", "=", branch)
                    .whereRaw(`DATE(pd.createddate) BETWEEN '${fromDate}' and '${toDate}'`)
                    .select(knex_1.database.raw("IFNULL(cashamount,0) as cashamount"), knex_1.database.raw("IFNULL(bankamount,0) as bankamount"), knex_1.database.raw("case when IFNULL(cardamount,0) > 0 AND debitorcreditcard = 'CREDIT_CARD' then IFNULL(cardamount,0) ELSE IFNULL(cardamount,0) END AS creditcard"), knex_1.database.raw("case when IFNULL(cardamount,0) > 0 AND debitorcreditcard = 'DEBIT_CARD' then IFNULL(cardamount,0) ELSE IFNULL(cardamount,0) END AS debitcard"));
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
    getQueryReportsByBranch(branch, fromDate, toDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Subquery definition
                const subquery = knex_1.database
                    .select([
                    "cb.branchname",
                    knex_1.database.raw("IFNULL(cashamount, 0) AS cashamount"),
                    knex_1.database.raw("IFNULL(bankamount, 0) AS bankamount"),
                    knex_1.database.raw(`
    CASE 
      WHEN IFNULL(cardamount, 0) > 0 AND debitorcreditcard = 'CREDIT_CARD' 
      THEN IFNULL(cardamount, 0) 
      ELSE IFNULL(cardamount, 0) 
    END AS creditcard`),
                    knex_1.database.raw(`
    CASE 
      WHEN IFNULL(cardamount, 0) > 0 AND debitorcreditcard = 'DEBIT_CARD' 
      THEN IFNULL(cardamount, 0) 
      ELSE IFNULL(cardamount, 0) 
    END AS debitcard`),
                ])
                    .from("tbl_paymentdetails as pd")
                    .innerJoin("tbl_paymenttypes as pt", "pd.transactionnumber", "pt.transactionnumber")
                    .innerJoin("tbl_branch as b", "b.sno", "paymentbranch")
                    .innerJoin("tbl_customer as c", function () {
                    this.on("c.customerid", "=", "pt.customerid");
                })
                    .innerJoin("tbl_branch as cb", "cb.sno", "c.branchid")
                    .andWhere("pd.paymentbranch", "=", branch)
                    .whereRaw("DATE(pd.createddate) BETWEEN ? AND ?", [fromDate, toDate])
                    .as("T");
                return yield knex_1.database
                    .select("branchname")
                    .sum("cashamount as cashamount")
                    .sum("bankamount as bankamount")
                    .sum("creditcard as creditcard")
                    .sum("debitcard as debitcard")
                    .from(subquery)
                    .groupBy("branchname");
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
exports.ReportQuery = ReportQuery;
//# sourceMappingURL=query.js.map