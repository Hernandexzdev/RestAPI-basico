import { request, response } from "express";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/usuario.js";


export const validarJWT = async(req = request, res = response, next) => {
    
    const token = req.header('x-token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);
        
        //* Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );


        //* Verificamos si existe el usuario que intentamos eliminar
        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no validos - usuario con estado false'
            })
        }

        //* Verificamos si el uid tiene estado true
        if ( !usuario.estado ) {
            
        }

        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

    
}