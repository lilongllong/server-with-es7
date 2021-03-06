import LRUCache from "lru-cache";
import { query } from "../../db/connection.js";
// Map put and get meathods.
// Add node-cache
// const blServiceCache = {
//     busLineInfo: new Map()
// };
// 添加cache
const options = {
    max: 1000,
    length: function (n, key) { return n * 2 + key.length },
    dispose: function (key, n) { n.close() },
    maxAge: 24 * 60 * 60
};
const blCache = LRUCache(options);
// const blCache = new NodeCache({
//     stdTTL: 100,
//     checkperiod: 120
// });
export default class BlService
{
    async getBusLineInfo(lineId, direction, language = "1") {
        const key = `bl-${lineId}-${direction}-${language}`;
        const cacheData = blCache.get(key);
        console.log(cacheData, "cached data");
        if (cacheData !== undefined)
        {
            console.log("cached");
            return cacheData;
        }
        else
        {
            const rows = await query(
                `select
                    lineStop."STOP_ID",
                    "STOP_NAME",
                    "LAT",
                    "LNG",
                    "SEQ_NO"
                from "SAP_ITRAFFIC_DEMO"."sap.traffic.demo.ptm.s.db::BUS.GIS_EXT.LINE_STOP" lineStop
                inner join "SAP_ITRAFFIC_DEMO"."sap.traffic.demo.ptm.s.db::BUS.GIS_EXT.STOP_NAME_T" stopName on
                    lineStop."STOP_ID"=stopName."STOP_ID"
                where "LINE_ID"=? and "DIRECTION"=? and "LANGU"=?
                order by "SEQ_NO"`,
                [
                    lineId,
                    direction,
                    language
                ]
            );
            const result = rows.map(item => [ item.STOP_ID, item.STOP_NAME, [item.LAT, item.LNG], item.SEQ_NO ]);
            // const result = "temp data";
            // maxAge 需要设定 if data update in 5 minute, set maxAge = 5 * 60
            blCache.set(key, result, 24 * 60 * 60);
            return result;
        }
    }

    // more function
}
