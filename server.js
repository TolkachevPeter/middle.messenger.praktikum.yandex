require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.static(__dirname + "/dist"));
app.listen(process.env.PORT || 3000, function () {
    console.log(
        `Server listening on port: ${process.env.CHAT_APP_PORT || 3000}`,
        __dirname
    );
});
