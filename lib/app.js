import express from "express";

const app = express(); //function

// app meathod
app.attach = function(httpServer)
{
    httpServer.on("request", app);
};

app.detach = function(httpServer)
{
    httpServer.on("request", app);
}

// monitor the server status
app.use(function(error, req, res, next) {
    const status = error.status || 500;
    res.status(status).send(`httpServer error: ${status}`);
});

export default app;
