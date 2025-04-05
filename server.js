"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var bodyParser = require("body-parser");
var app = (0, express_1.default)();
var cors = require("cors");
app.use(express_1.default.static("public"));
app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
}));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.resolve(`${__dirname}\\dbconfig\\`, `.env.${process.env.NODE_ENV}`),
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const groupcontroller_1 = __importDefault(require("./controller/groupcontroller"));
const schemecontroller_1 = __importDefault(require("./controller/schemecontroller"));
const commoncontroller_1 = __importDefault(require("./controller/commoncontroller"));
const concerncontroller_1 = __importDefault(require("./controller/concerncontroller"));
const customercontroller_1 = __importDefault(require("./controller/customercontroller"));
const userrolescontroller_1 = __importDefault(require("./controller/userrolescontroller"));
const chitgiftcontroller_1 = __importDefault(require("./controller/chitgiftcontroller"));
const employeeconfigmenucontroller_1 = __importDefault(require("./controller/employeeconfigmenucontroller"));
const knexcontroller_1 = __importDefault(require("./controller/knexcontroller"));
const PORT = 8888
app.use("/v1/group", groupcontroller_1.default);
app.use("/v1/scheme", schemecontroller_1.default);
app.use("/v1/common", commoncontroller_1.default);
app.use("/v1/concern", concerncontroller_1.default);
app.use("/v1/customer", customercontroller_1.default);
app.use("/v1/userrole", userrolescontroller_1.default);
app.use("/v1/chitgift", chitgiftcontroller_1.default);
app.use("/v1/configmenus", employeeconfigmenucontroller_1.default);
app.use("/v1/payment", knexcontroller_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map