import { Router } from "express";

const router = Router();


router.use("/bus-line", require("./bus-line.js").default);

export default router;
