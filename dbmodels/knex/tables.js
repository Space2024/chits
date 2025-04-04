"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbTables = void 0;
exports.dbTables = {
    MENUCONFIG: {
        TABLENAME: "tbl_departmentconfigmenus",
        Department: "department",
        Menuname: "menuname",
        All: "all",
        View: "view",
        Add: "add",
        Edit: "edit",
        Delete: "delete",
    },
    MACHINENAMES: {
        TABLENAME: "tbl_machinenames",
        ID: "id",
        MachineNames: "machinenames",
    },
    MACHINENUMBERS: {
        TABLENAME: "tbl_machinenumbers",
        ID: "id",
        MachineNamesId: "machinenamesid",
        MachineNumbers: "machinenumbers",
    },
    CURRENCIES: {
        TABLENAME: "tbl_currencies",
        ID: "id",
        Currency: "currency",
        Isactive: "isactive",
    },
    OTP: {
        TABLENAME: "tbl_customersotp",
        ID: "id",
        CustomerId: "customerid",
        Verified: "verified",
        Otp: "otp",
    },
    PAYMENTS: {
        TABLENAME: "tbl_payments",
        ID: "id",
        CustomerId: "customerid",
        MonthYear: "monthyear",
        TransactionNumber: "transactionnumber",
    },
    PAYMENT_TYPES: {
        TABLENAME: "tbl_paymenttypes",
        ID: "id",
        CustomerId: "customerid",
        MonthYear: "monthyear",
        CardPayment: "cardpayment",
        CashPayment: "cashpayment",
        BankPayment: "bankpayment",
    },
    PAYMENT_DETAILS: {
        TABLENAME: "tbl_paymentdetails",
        ID: "id",
        CustomerId: "customerid",
        MonthYear: "monthyear",
        CardType: "cardtype",
        MachineName: "machinename",
        MachineNumber: "machinenumber",
        CardNumber: "cardnumber",
        CardAmount: "cardamount",
        CashAmount: "cashamount",
        BankAmount: "Bankamount",
        ReferenceNumber: "referencenumber",
        BankName: "bankname",
        Denomination: "denomination",
    },
};
//# sourceMappingURL=tables.js.map