import { query } from "../../db/connection.js";
// Map put and get meathods.
const blServiceCache = {
    busLineInfo: new Map()
};
// 添加cache
export default class BlService
{
    async getBusLineInfo(lineId, direction, language = "1") {
        const key = `${lineId}-${direction}-${language}`;
        return "get result!";
        if (blServiceCache.busLineInfo.get(key))
        {
            return blServiceCache.busLineInfo.get(key);
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
            blServiceCache.busLineInfo.put(key, result);
            return result;
        }
    }

    // more function
}
