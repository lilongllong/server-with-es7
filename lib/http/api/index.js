// common router
// filter request
// import diff modules routers
import { Router } from "express";

const router = Router();

router.use((req, res, next) => {
    // filter request
    // console.log(req);
    next();
});

router.use("/tpi", require("../../tpi/api").default);
router.use("/bl", require("../../bl/api").default);

export default router;
