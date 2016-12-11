// common router
// filter request
// import diff modules routers
import apicache from "apicache";
import { Router } from "express";

const cache = apicache.middleware;
const router = Router();
// 两种方式 添加
// global use(cache(time));
// private single use(path, cache(time), (req, res, next)function)
router.use(cache("5 minutes"));

router.use((req, res, next) => {
    // filter request
    // console.log(req);
    next();
});

router.use("/tpi", require("../../tpi/api").default);
router.use("/bl", require("../../bl/api").default);

export default router;
