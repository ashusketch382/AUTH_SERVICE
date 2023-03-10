const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

const ClientError = require("../utils/errors/client-error");
const ValidationError = require("../utils/errors/validation-error");
const AppErrors = require("../utils/errors/error-handler");

const { StatusCodes } = require("http-status-codes");

const UserRepository = require("../repository/user-repository");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create (data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == "SequelizeValidationError"){
                throw error;
            }
            console.log("somehting went wrong in service layer");
            throw(error);
        }
    }

    async signIn(email, plainPassword){
        try {
            // step1 -> get the user based on the email
            const user = await this.userRepository.getByEmail(email);
            
            if(!user){
                throw new ClientError("email");
            }
            // step2 -> match the incoming password with encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                throw new AppErrors(
                    "invalidPassword",
                    "Password not matching",
                    "Please give correct password",
                    StatusCodes.BAD_REQUEST 
                )
            }

            //  step3 -> generate the token and send it to the frontend side
            const newToken = this.createToken({email: user.email, id: user.id}); // this argument object needs to be plain js object it can't be sequel object
            return newToken;
        } catch (error) {
            if(error.name == "emailNotFound" || error.name == "invalidPassword") throw error;
            console.log("something went wrong while signing in");
            throw(error);
        }
    }

    async isAuthenticated (token){
        try {
            const response = this.verifyToken(token); // verify token is valid

            const user = await this.userRepository.getById(response.id); // checking if the user with current token exist or not
            if(!user){
                throw new ClientError("user");
            }
            return user.id; // returning user id so that we can store 
        } catch (error) {
            if(error.name == "tokenNotFound" || error.name == "userNotFound"){
                throw error;
            }
            console.log("something went wrong in auth process in service layer");
            throw error;
        }
    }

    createToken (user){
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("something went wrong while creating token");
            throw(error);
        }
    }

    verifyToken (token) {
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            if(error.name == "JsonWebTokenError"){
                throw new ClientError("token");
            };
            console.log("something went wrong while verifying token");
            throw error;
        }
    }

    checkPassword (userInputPlainPassword, encryptedPassword) {
        try {
            const result = bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
            return result;
        } catch (error) {
            console.log("something went wrong while checking password");
            throw { error: "invalid Password"};
        }
    }

    isAdmin (userId) {
        try {
            const result = this.userRepository.isAdmin(userId);
            return result;
        } catch (error) {
            console.log("somehting went wrong in service layer");
            throw(error);
        }
    }
}

module.exports = UserService;