import { Router } from "express";

import BlInfoService from "../service/BlInfoService";

const router = Router();
const blInfoService  = new BlInfoService();

router.get("/:lineId-:direction/info", async (req, res, next) => {
    const lineId = req.params.lineId;
    const direction = req.params.direction;
    res.setHeader("Cache-Controll", `max-age=${60 * 60 * 24 * 365}`);å
    try {
        const busLineInfo = await blInfoService.getBusLineInfo(lineId, direction);
        res.send(busLineInfo);
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});

export default router;
