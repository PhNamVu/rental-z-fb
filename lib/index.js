"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitDoneTask = exports.userSetup = exports.adminSetup = void 0;
const functions = require("firebase-functions");
exports.adminSetup = functions.https.onRequest(async (req, res) => {
    await (await Promise.resolve().then(() => require("./fn/services/auth/admin-setup"))).default(req, res);
});
exports.userSetup = functions.https.onRequest(async (req, res) => {
    await (await Promise.resolve().then(() => require("./fn/services/auth/user-setup"))).default(req, res);
});
exports.submitDoneTask = functions.https.onRequest(async (req, res) => {
    await (await Promise.resolve().then(() => require("./fn/services/mail/submit-done-task"))).default(req, res);
});
//# sourceMappingURL=index.js.map