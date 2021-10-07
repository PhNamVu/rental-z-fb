"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCustomClaims = void 0;
exports.adminCustomClaims = (userId) => ({
    "https://hasura.io/jwt/claims": {
        "x-hasura-default-role": "admin",
        "x-hasura-allowed-roles": ["admin"],
        "x-hasura-user-id": userId,
    },
});
//# sourceMappingURL=admin-claims.js.map