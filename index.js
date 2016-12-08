// setting app and server
import express from "express";

import app from "./lib/app";
import httpServer from "./lib/http/server";

(function startServer() {
    app.attach(httpServer);
    app.use(express.static("./public"));
    app.use("/api/", require("./lib/http/api").default);

    const port = process.env.PORT || 8080;
    httpServer.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
})();
