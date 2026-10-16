"use strict";

const express = require("express");

const incidentsRouter = require("./incidents.router");

function routerApi(app){
    const apiRouter = express.Router();

    app.use("/api", apiRouter);

    apiRouter.use("/incidents", incidentsRouter);
}

module.exports = routerApi;