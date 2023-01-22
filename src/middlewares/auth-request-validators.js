const validateUserAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "something went wrong",
            err: "Email or password missing in the request"
        });
    }
    next();
}

const validateISAdminRequest = (req,res,next) => {
    if(!req.body.id){
        return res.status(400).json({
            data: {},
            success: false,
            message: "somehitng went wrong",
            err: "User Id not given"
        });
    }
    next();
}
module.exports = {
    validateUserAuth,
    validateISAdminRequest
}