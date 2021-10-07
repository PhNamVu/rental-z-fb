"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.Variables = void 0;
const graphql_request_1 = require("../../../utils/graphql-request");
// eslint-disable-next-line require-jsdoc
class Variables {
}
exports.Variables = Variables;
exports.createUser = (variables) => graphql_request_1.graphqlRequestClient(
/* GraphQL */ `
        mutation insert_users(
            $object: users_insert_input!
        ) {
            insert_users(objects: [$object]) {
                affected_rows
            }
        }
        `, variables, true);
//# sourceMappingURL=create-user.js.map