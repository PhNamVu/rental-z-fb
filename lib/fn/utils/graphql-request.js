"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlRequestClient = void 0;
const graphqurl = require("graphqurl");
const functions = require("firebase-functions");
exports.graphqlRequestClient = (query, variables, isAdmin = false, token = null) => graphqurl.query({
    query,
    endpoint: functions.config().prod.httpgraphqluri,
    headers: isAdmin ?
        {
            "x-hasura-admin-secret": functions.config().prod.httpgraphqlsecret,
        } :
        {
            authorization: `Bearer ${token}`,
        },
    variables,
});
//# sourceMappingURL=graphql-request.js.map