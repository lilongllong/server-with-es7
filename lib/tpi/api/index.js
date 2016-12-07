import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
    console.log("get request");
});

export default router;
