const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/serverConfig");
const bcrypt = require("bcrypt");

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
            console.log("somehting went wrong in service layer");
            throw(error);
        }
    }

    async signIn(email, plainPassword){
        try {
            // step1 -> get the user based on the email
            const user = await this.userRepository.getByEmail(email);
            
            // step2 -> match the incoming password with encrypted password
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            if(!passwordMatch) {
                console.log("password doesn't match");
                throw {error: "Invalid Password"};
            }

            //  step3 -> generate the token and send it to the frontend side
            const newToken = this.createToken({email: user.email, id: user.id}); // this argument object needs to be plain js object it can't be sequel object
            return newToken;
        } catch (error) {
            console.log("something went wrong while signing in");
            throw(error);
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
            console.log("something went wrong while verifying token");
            throw(error);
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
}

module.exports = UserService;