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

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const result = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: result,
            success: true,
            message: "succesfully authenticated user and token is valid",
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Couldn't Authenticate, something went wrong",
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}