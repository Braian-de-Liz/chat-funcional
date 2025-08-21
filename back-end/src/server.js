/* import { WebSocketServer } from "ws";
import dotenv from "dotenv";

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
  */
import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`Servidor WebSocket rodando na porta ${PORT}`);

const users = new Map();

wss.on("connection", (ws) => {
    let userId = null;

    ws.on("message", (message) => {
        let data;
        try {
            data = JSON.parse(message);
        } catch (e) {
            console.error("Mensagem inválida recebida:", message.toString());
            return;
        }

        if (data.type === "register") {
            userId = data.userId;
            users.set(userId, {
                ws,
                name: data.name,
                color: data.color
            });
            broadcastSystemMessage(`${data.name} entrou no chat`);
            return;
        }

        if (data.type === "message" && userId) {
            broadcastMessage({
                senderId: userId,
                content: data.content,
                timestamp: new Date().toLocaleTimeString()
            });
        }
    });

    ws.on("close", () => {
        if (userId && users.has(userId)) {
            const user = users.get(userId);
            broadcastSystemMessage(`${user.name} saiu do chat`);
            users.delete(userId);
        }
    });

    ws.on("error", console.error);
});

function broadcastMessage(message) {
    const sender = users.get(message.senderId);

    if (!sender) return;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "message",
                sender: sender.name,
                color: sender.color,
                content: message.content,
                time: message.timestamp,
                isYou: client === sender.ws
            }));
        }
    });
}

function broadcastSystemMessage(content) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: "system",
                content
            }));
        }
    });
}
