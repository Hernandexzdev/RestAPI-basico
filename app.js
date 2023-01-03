import * as dotenv from "dotenv";
import {Server} from "./models/server.js";

//* Configuraciones
dotenv.config();
const server = new Server();

server.lister();
