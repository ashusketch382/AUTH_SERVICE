const AppErrors = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppErrors {
    constructor(error){
        let explanation = [];
        error.errors.forEach(error => {
            explanation.push(error.message);
        });
        super(
        error.name,
        "Not able to validate the data sent in the request",
        explanation,
        StatusCodes.BAD_REQUEST
        );
    }
}

module.exports = ValidationError;