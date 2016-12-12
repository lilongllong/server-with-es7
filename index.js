// setting app and server
import config from "config";
import express from "express";

import app from "./lib/app";
import httpServer from "./lib/http/server";
import socketServer from "./lib/ws/server";

(function startServer() {
    checkEnvironment();
    initApp();
    initHttpServer();
    initSocketServer();
})();

function checkEnvironment()
{
    const env = app.get("env");
    if (env === "production")
    {
        console.log("Server is running in [production] mode.");
    }
    else if (env === "development")
    {
        console.log("Server is running in [development] mode.");
    }
    else
    {
        throw new Error("Server can be started in other env mode except development and production.")
    }
}

function initApp()
{
    app.attach(httpServer);
    if (process.env.NODE_ENV === "development")
    {
        app.use(express.static("./public"));
    }
    app.use("/api/", require("./lib/http/api").default);
}

function initHttpServer()
{
    const port = config.get("http.port");
    console.log(port, " port");
    httpServer.listen(port, () => {
        console.log(`Server is listening at ${port}...`);
    });
}

function initSocketServer()
{
    app.attach(socketServer);
}
