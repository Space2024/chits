"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportURIs = exports.PaymentURIs = exports.ConfigMenuURIs = exports.ChitGiftURIs = exports.CustomerURIS = exports.CommonURIs = exports.ConcernURIs = exports.UserRolesURIs = exports.SchemeURIs = exports.GroupURIs = void 0;
exports.GroupURIs = {
    GET_ALL_GROUPS: "getgroupdetail",
    INSERT_GROUP: "usp_insert_update_group",
    UPDATE_GROUP: "usp_insert_update_group",
    DELETE_GROUP: "usp_insert_update_group",
};
exports.SchemeURIs = {
    GET_ALL_SCHEMES: "allschemes",
    INSERT_SCHEMES: "addnewscheme",
    UPDATE_SCHEMES: "modifyscheme",
    DELETE_SCHEMES: "deletescheme",
};
exports.UserRolesURIs = {
    GET_ALL_USERROLES: "alluserroles",
    INSERT_USERROLE: "addnewuserrole",
    UPDATE_USERROLE: "modifyuserrole",
};
exports.ConcernURIs = {
    GET_ALL_CONCERNS: "allconcerns",
    INSERT_CONCERN: "addnewconcern",
    UPDATE_CONCERN: "modifyconcern",
    DELETE_CONCERN: "deleteconcern",
};
exports.CommonURIs = {
    GET_ALL_EMPLOYEES: "allemployees",
    GET_ALL_BRANCHES: "allbranchess",
    GET_ALL_DASHBOARD_COUNTS: "dashboardcounts",
    VALIDATE_LOGIN: "validatelogin",
    GET_ALL_DROPDWONS: "alldropdowns",
    GET_SCHEME_DETAILS_BY_CUSTOMERNUMBER: "chitgiftschemedetails",
    EMPLOYEE_BULK_INSERT: "bulkemployeeinsert",
    EMPLOYEE_BULK_UPDATE: "bulkemployeeupdate",
    BRANCH_BULK_UPDATE: "bulkbranchupdate",
    BRANCH_BULK_INSERT: "bulkbranchinsert",
    MENU_CONFIGS: "bulkmenuinsert",
    SEND_OTP: "sendotp",
    GET_CHARTS: "getcharts",
    POST_CUSTOMER_FINAL_APPROVE: "approveredeem",
    PAYTM_PAYMENT: "proceedtopaypaytm",
    CUSTOMER_BULK_INSERT: "bulkcustomerinsert",
};
exports.CustomerURIS = {
    GET_ALL_CUSTOMER: "allcustomers",
    VIEW_ALL_CUSTOMER: "viewcustomers",
    INSERT_CUSTOMER: "addnewcustomer",
    UPDATE_CUSTOMER: "modifycustomer",
    DELETE_CUSTOMER: "deletecustomer",
    GET_CUSTOMER_SCHEMES: "getcustomerschemes",
    GET_CUSTOMER_PAYMENT_HISTORY: "getcustomerpayment",
    GET_CUSTOMER_MATURITY_SCHEME: "getcustomermaturityscheme",
    GET_CUSTOMER_CLOSE_SCHEME: "closescheme",
    GET_CUSTOMER_CLOSE_SCHEME_DETAILS: "customerclosedata",
};
exports.ChitGiftURIs = {
    GET_ALL_CHIT_GIFT: "allchitgift",
    INSERT_CHIT_GIFT: "addnewchitgift",
    UPDATE_CHIT_GIFT: "modifychitgift",
    DELETE_CHIT_GIFT: "deletechitgift",
};
exports.ConfigMenuURIs = {
    GET_ALL_MENUS: "allconfigmenus",
    INSERT_MENUS: "addnewmenus",
    UPDATE_MENUS: "modifymenus",
    GET_ACCESS_BY_MENU: "menuaccess",
    GET_ALL_MACHINENAMES: "getallmachinenames",
    GET_ALL_MACHINENUMBERS_BY_MACHINENAME: "getallmachinenumbers",
    GET_ALL_CURRENCY: "getallcuurrency",
    INSERT_OTP: "otpdata",
};
exports.PaymentURIs = {
    INSERT_PAYMENT: "addpayment",
};
exports.ReportURIs = {
    GET_DAILY_REPORT: "getdailyreport",
    GET_BRANCHWISE_REPORT: "getbranchwisereport",
};
//# sourceMappingURL=uris.js.map