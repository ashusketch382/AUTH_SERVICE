const UserService = require("../service/user-service");

const userService = new UserService();
const create = async (req,res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: "succesfully created the user",
            err: {}
        });
    } catch (error) {
        res.status(500).json({
            data: {},
            success: false,
            message: "Couldn't create user",
            err: error
        })
    }
}

module.exports = {
    create
}