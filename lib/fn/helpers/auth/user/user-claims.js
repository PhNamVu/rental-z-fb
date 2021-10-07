"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCustomClaims = void 0;
exports.userCustomClaims = (userId) => ({
    "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "user",
        "x-hasura-allowed-roles": ["user"],
        "x-hasura-user-id": userId,
    },
});
//# sourceMappingURL=user-claims.js.map