const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
// const UserRepository = require("./repository/user-repository");

const app = express();

const prepareAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use("/api", apiRoutes);

    // const userRepository = new UserRepository(); 
    // const response = await userRepository.getById(2);
    // console.log(response);

    app.listen(PORT, () => {
        console.log("server started on port ", PORT);
    });
}

prepareAndStartServer();