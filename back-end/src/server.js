import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: PORT });

console.log(`Servidor WebSocket rodando na porta ${PORT}`);

wss.on("connection", (ws) => {
    console.log("Cliente conectado.");

    // ✅ NENHUMA mensagem é enviada pelo servidor
    // → O cliente que decide o que exibir ao conectar

    ws.on("message", (data) => {
        console.log("Recebido do cliente:", data.toString());

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on("error", (error) => {
        console.error("Erro no WebSocket:", error);
    });
});