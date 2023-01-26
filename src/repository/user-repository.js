const  ValidationError  = require("../utils/errors/validation-error");
const { User, Role } = require("../models/index");
const { StatusCodes } = require("http-status-codes");

class UserRepository {

    async create (data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                throw new ValidationError(error);
            }
            console.log("something went wrong in repository layer");
            throw(error);
        }
    }

    async destroy (userID) {
        try {
            await User.destroy({
                where: {
                    id: userID
                }
            });
            return true;
        } catch (error) {
            console.log("something went wrong in repository layer");  
            throw(error);   
        }
    }

    async getById (userID) {
        try {
            const user =await User.findByPk(userID, {
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw(error);
        }
    }

    async getByEmail (userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            return user;
        } catch (error) {
            console.log("something went wrong while fetching user by email");
            throw(error);
        }
    }

    async isAdmin (userId) {
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name : 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("something went wrong in repository layer");
            throw(error);
        }
    }
}

module.exports = UserRepository;