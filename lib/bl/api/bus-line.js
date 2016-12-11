import { Router } from "express";

import BlService from "../service/BlService";

const router = Router();
const blService  = new BlService();

router.get("/:lineId-:direction/info", async (req, res, next) => {
    const lineId = req.params.lineId;
    const direction = req.params.direction;
    res.setHeader("Cache-Controll", `max-age=${60 * 60 * 24 * 365}`);
    try {
        const busLineInfo = await blService.getBusLineInfo(lineId, direction);
        res.send(busLineInfo);
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
});

export default router;
