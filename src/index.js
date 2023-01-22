const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
// const UserRepository = require("./repository/user-repository");
// const UserService = require("./service/user-service");
const db = require("./models/index");

const app = express();

const prepareAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use("/api", apiRoutes);
    if(process.env.DB_SYNC){
        db.sequelize.sync({alter: true});
    }

    app.listen(PORT, () => {
        console.log("server started on port ", PORT);
    });
}

prepareAndStartServer();