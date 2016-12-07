// common router
// filter request
// import diff modules routers
import { Router } from "express";

const router = Router();

router.use((req, res, next) => {
    // filter request
    next();
});

router.use("/tpi", require("../../tpi/api").default);

export default router;
