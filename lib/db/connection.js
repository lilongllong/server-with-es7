import config from "config";
import hdb from "hdb";

let connection = null;
// connection连接是个异步过程，因此必须用promise封装
// getConnection 必须私有，不能暴露
function getConnection()
{
    if (!connection) {
        connection = hdb.createClient(config.get("db.connection"));
        connection.on("error", (error) => {
            console.log("Hdb Network Connection:" + error);
        });
    }
    return new Promise((resolve, reject) => {
        if (connection.readyState === "connected")
        {
            resolve(connection);
        }
        connection.connect((error) => {
            if (error)
            {
                reject(error);
            }
            else
            {
                resolve(connection);
            }
        });
    });
}

export default async query(command, params)
{
    let connection = await getConnection();
    return new Promise((resolve, reject) => {
        connection.prepare(command, (error, statement) => {
            if (error)
            {
                reject(error);
            }
            else
            {
                statement.exec(params, (error, data) => {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve(data);
                    }
                });
            }
        });
    });
}
