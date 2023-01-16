const { response } = require("express");
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
const signIn =  async (req, res) => {
    try {
        const result = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            data: result,
            success: true,
            message: "successfully signed in",
            err: {}
        });

    } catch (error) {
        res.status(501).json({
            data: {},
            success: false,
            message: "Couldn't sign in",
            err: error
        });
    }
}

module.exports = {
    create,
    signIn
}