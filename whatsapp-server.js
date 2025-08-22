// import { Server } from "socket.io";
// import type {Socket} from "socket.io";
// import { createServer } from "node:http";
// import pkg, { Client } from "whatsapp-web.js";
// import type { Message } from "whatsapp-web.js";
// import fs from "fs";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var _a = require("socket.io"), Server = _a.Server, Socket = _a.Socket;
var createServer = require("node:http").createServer;
var _b = require("whatsapp-web.js"), Client = _b.Client, LocalAuth = _b.LocalAuth, Message = _b.Message;
var fs = require("fs");
// PORT ::
var PORT = 8080;
// JUST COLORS:::
var Reset = "\x1b[0m"; // reset to default
var Bright = "\x1b[1m"; // bright/bold
var FgRed = "\x1b[31m";
var FgGreen = "\x1b[32m";
var FgYellow = "\x1b[33m";
var FgBlue = "\x1b[34m";
var client = null;
if (!client) {
    client = new Client({
        authStrategy: new LocalAuth({
            clientId: "123",
            dataPath: "./sessions",
        }),
        puppeteer: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true, // keep it headless in production
        },
    });
}
client === null || client === void 0 ? void 0 : client.initialize();
var server = createServer();
var io = new Server(server, {
    cors: {
        origin: "*"
    }
});
io.on("connection", function (socket) {
    console.log(">> Connection Established!");
    client.on("authenticated", function () {
        console.log("");
        socket.emit("auth_success");
    });
    socket.on("qr_request", function () {
        // SOME SORT OF IF CLIENT CHECK?
        client.on("qr", function (qr_string) {
            console.log(">> ".concat(FgBlue, " Generated QR Success, emitting response ").concat(Reset));
            socket.emit("qr_response", qr_string);
        });
        client.on("ready", function () {
            console.log(">> ".concat(FgGreen, " WA Client Ready! ").concat(Reset));
            socket.emit("client_ready");
        });
    });
    socket.on("start_automation", function (autoMsg) {
        console.log("".concat(FgGreen, "::::::Starting Automation:::::: ").concat(Reset));
        client.emit("automation_started");
        client.on("message", function (message) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("".concat(FgGreen, " REPLYING WITH ").concat(Reset, " ").concat(autoMsg, " "));
                        return [4 /*yield*/, message.reply(autoMsg)];
                    case 1:
                        _a.sent();
                        console.log("".concat(FgYellow, " Successfully replied to ").concat(Reset, " ").concat(message.from.slice(0, -4)));
                        return [2 /*return*/];
                }
            });
        }); });
        console.log("".concat(FgGreen, " Listening for Incoming Messages ").concat(Reset));
    });
});
server.listen(PORT, function () { return console.log("".concat(FgBlue, " <---------Websocket started at port ").concat(PORT, "---------> ").concat(Reset)); });
