import { Router } from "express";

const router = Router();

router.get("/bus-line/", require("./bus-line.js"));

export default router;
