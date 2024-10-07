import { AppDataSource } from "./data-source";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";

import cliente from "./routes/cliente";
import acomodacao from "./routes/acomodacao";
import dependente from "./routes/dependente";
import quarto from "./routes/quarto";

import { Server } from "socket.io";

const app = express();
const port = 5555;

AppDataSource.initialize().then(async () => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");

    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/clientes', cliente);
    app.use('/acomodacoes', acomodacao);
    app.use('/dependentes', dependente);
    app.use('/quartos', quarto);
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    });

    io.on("connection", (socket) => {
        console.log("Conectado: ");

        socket.on("joinRoom", (room) => {
            socket.join(room);
        }
        );

        socket.on("message", (message, room, tipoUsuario, nome, data) => {
            io.to(room).emit("message", message, tipoUsuario, nome, data);
            console.log("Mensagem: ", message);
        }
        );

        socket.on("disconnect", () => {
            console.log("Desconectado: ");
        }
        );
    }
    );

    server.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    }
    );

}

).catch((error) => {
    console.error("Erro ao conectar com o banco de dados: ", error);
}
);