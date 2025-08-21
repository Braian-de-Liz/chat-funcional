import { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: PORT });

console.log(`Servidor WebSocket rodando na porta ${PORT}`);

wss.on("connection", (ws) => {
    console.log("Cliente conectado.");


    ws.send(JSON.stringify({
        usuarioID: "system",
        usuarioNome: "Sistema",
        usuarioCor: "gray",
        contet: "Bem-vindo ao chat!",
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    ws.on("message", (data) => {
        console.log("Recebido do cliente:", data.toString());

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data); 
            }
        });
    });

    ws.on("error", console.error);
});