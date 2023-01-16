const { User } = require("../models/index");

class UserRepository {

    async create (data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
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
}

module.exports = UserRepository;