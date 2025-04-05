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
exports.database = void 0;
const knex_1 = __importDefault(require("knex"));
const database = (0, knex_1.default)({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port:process.env.DB_PORT
    },
});
exports.database = database;
database.raw("SELECT 1").then(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[ MySql connected ]");
    }
    catch (e) {
        console.log("[ MySql not connected ]");
        console.log("error ", e);
    }
}));
database.on("query", (queryData) => {
    console.log("SQL Query:", queryData.sql);
    console.log("Bindings:", queryData.bindings);
});
//# sourceMappingURL=knex.js.map