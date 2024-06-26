const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, function () {
  console.log("server started on port 3000");
});

/** Begin Websocket */

const WebsocketServer = require("ws").Server;

const wws = new WebsocketServer({ server: server });

wws.on("connection", function connection(ws) {
  const numClients = wws.clients.size;
  console.log("Clients connected", numClients);

  wws.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("Welcome to my server");
  }

  ws.on("close", function close() {
    wws.broadcast(`Current visitors: ${numClients}`);
    console.log("A client has disconnected");
  });
});


wws.broadcast = function broadcast(data) {
    wws.clients.forEach(function each(client){
        client.send(data);
    })
}