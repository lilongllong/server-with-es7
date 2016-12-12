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
    let instance = 0;
    if (process.env.NODE_APP_INSTANCE && !isNaN(parseInt(process.env.NODE_APP_INSTANCE)))
    {
        instance = parseInt(process.env.NODE_APP_INSTANCE);
    }

    console.log(instance, process.env.NODE_APP_INSTANCE);

    const port = parseInt(config.get("http.port")) + instance;
    if (isNaN(port))
    {
        throw new Error(`"http.port" must be specified as number in config.`);
    }

    httpServer.listen(port, () => {
        console.log(`Server is listening at ${port}...`);
    });
}

function initSocketServer()
{
    app.attach(socketServer);
}
