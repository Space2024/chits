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
exports.ConnectDB = exports.EstablishDbConnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
exports.EstablishDbConnection = {
    host: "stpl-ktm.cb2ymckcwftz.ap-south-1.rds.amazonaws.com",
    user: "admin",
    password: "HHepo6YA0NPfYrVkegAz",
    database: "onlinechit",
    port: Number(3306),
    waitForConnections: true,
};
// const ConnectDB = async () => {
//   // try {
//   //   let pool: any;
//   //   let con: any;
//   //   // if (pool) con = pool.getConnection();
//   //   // else {
//   //   console.log("connection successfull");
//   //   con = await mysql.createConnection(EstablishDbConnection);
//   //   // con = pool.getConnection();
//   //   // }
//   //   return con;
//   // } catch (error) {
//   //   console.log("unable to connect db" + error);
//   // }
//   try {
//     let pool: any;
//     let con: any;
//     if (pool) con = pool.getConnection();
//     else {
//       pool = await mysql.createPool(EstablishDbConnection);
//       con = pool.getConnection();
//       console.log("connection successfull");
//     }
//     return con;
//   } catch (ex) {
//     console.log("unable to connect db");
//     throw ex;
//   }
// };
const ConnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(exports.EstablishDbConnection);
    try {
        let pool;
        let con;
        if (pool) {
            con = pool.getConnection();
        }
        else {
            pool = yield promise_1.default.createPool(exports.EstablishDbConnection);
            con = pool;
        }
        console.log("connection successfull");
        return con;
    }
    catch (error) {
        console.log("unable to connect db" + error);
    }
});
exports.ConnectDB = ConnectDB;
//# sourceMappingURL=config.js.map