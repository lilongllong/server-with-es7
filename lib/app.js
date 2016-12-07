import express from "express";

const app = express(); //function

app.use((req,res, next) => {
    //
    next();
});
