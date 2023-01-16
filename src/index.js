const express = require("express");
const bodyParser = require("body-parser");

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
// const UserRepository = require("./repository/user-repository");
// const UserService = require("./service/user-service");

const app = express();

const prepareAndStartServer = async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use("/api", apiRoutes);

    // const userService = new UserService();

    // const result = userService.createToken({email: "brother@admin.com", id: "1"});
    // console.log(result);
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyb3RoZXJAYWRtaW4uY29tIiwiaWQiOiIxIiwiaWF0IjoxNjczODc5Mjk1LCJleHAiOjE2NzM4ODI4OTV9.YR0G-OpCaCTmm0eYPdDokx_hGi9iSQeJskBN9gwNtwI";
    // const result = userService.verifyToken(token);
    // console.log(result);
    // const userRepository = new UserRepository(); 
    // const response = await userRepository.getById(2);
    // console.log(response);

    app.listen(PORT, () => {
        console.log("server started on port ", PORT);
    });
}

prepareAndStartServer();