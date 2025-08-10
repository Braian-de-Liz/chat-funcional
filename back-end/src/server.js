const { WebSocketServer } = require("ws");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: PORT });

console.log(`Servidor WebSocket rodando na porta ${PORT}`);

wss.on("connection", (ws) => {
    console.log("Cliente conectado.");

    ws.send("mensagem enviada pelo server");

    ws.on("message", (data) => {
        console.log("Recebido do cliente:", data.toString());

        
        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(data.toString());
            }
        });
    });

    ws.on("error", console.error);
});
 