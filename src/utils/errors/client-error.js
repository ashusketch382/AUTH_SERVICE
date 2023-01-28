const AppErrors = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ClientError extends AppErrors {
    constructor(attribute){
        super(
        `${attribute}NotFound`,
        `Invalid ${attribute} sent in the request`,
        `Please send the valid ${attribute}, as there is no record with this ${attribute}`,
        StatusCodes.NOT_FOUND
        );
    }
}

module.exports = ClientError;