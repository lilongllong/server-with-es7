import server from "../ws/server";

const tpiNameSpace = server.of("/tpi/rt");
// of 一

// socket并不是用来传输数据，更多的是通知前段来取数据，前端通过http来取数据
tpiNameSpace.on("connection", socket => {

    socket.on("disconnect", (res) => {

    });
});

export default tpiNameSpace;
