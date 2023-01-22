import {  request, response } from "express";
import bcryptjs from "bcryptjs";
import { Usuario } from "../models/usuario.js";
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

export const login = async(req = request, res = response) => {

    const {correo, password} = req.body;

    try {
        
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }   


    
}

export const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;


    try {
        
        const { nombre, img, correo} = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            //* Se tiene que crear el usuario 
            const data = {
                nombre,
                correo,
                password: ';p', //? no se puede autenticar una persona aunque sepa que la password hay un has de verificacion
                img,
                google: true
                
            };

            usuario = new Usuario( data );
            
           await usuario.save();
        }


        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el adminitrador, usuario blooqueado'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

    
} 