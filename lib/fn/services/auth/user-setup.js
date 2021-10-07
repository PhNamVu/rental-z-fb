"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const user_claims_1 = require("../../helpers/auth/user/user-claims");
const create_user_1 = require("../../helpers/auth/user/create-user");
admin.initializeApp();
exports.default = async (req, res) => {
    console.log("/userSetup start");
    try {
        const { input: { token, firstName, lastName, role }, } = req.body.input;
        // decode user from token
        const user = await admin.auth().verifyIdToken(token);
        const userId = user.uid;
        const email = user.email;
        await create_user_1.createUser({
            object: {
                id: userId,
                email,
                firstName,
                lastName,
                role,
            },
        });
        const customClaims = user_claims_1.userCustomClaims(userId);
        await admin.auth().setCustomUserClaims(userId, customClaims);
        return res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Ok",
        });
    }
    catch (error) {
        console.log("/userSetup end with error");
        console.error(error);
        return res
            .status(400)
            .json({ status: "fail", statusCode: 400, message: error });
    }
};
//# sourceMappingURL=user-setup.js.map