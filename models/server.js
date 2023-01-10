import {fileURLToPath} from "url";
import path from "path";
import express from "express";
import cors from "cors";
import usuariosRouters from "../routes/usuarios.routes.js";
import  dbConnection  from "../database/config.js";


export class Server {

    constructor(){
        this.app  = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';


        //* Conexion a la DB
        this.conectarDB();


        //* Middlewares
        this.middlewares();
        

        //* Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

        //*Cors
        this.app.use(cors());

        //* Lectura y parseo
        this.app.use(express.json());

        //* Directorio Publico
        this.app.use( express.static('public') );

    }

    routes(){
        
        this.app.use( this.usuarioPath, usuariosRouters );
    }

    lister() {
        this.app.listen(this.port, () => console.log(`Servidor en puerto ${this.port}!`))
    }
}