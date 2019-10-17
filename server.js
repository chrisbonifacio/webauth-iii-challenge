const express = require("express");
const server = express();
const helmet = require("helmet");

const authRouter = require("./api/routes/authRouter");

server.use(helmet());
server.use(express.json());

server.use("/api", authRouter);

module.exports = server;
