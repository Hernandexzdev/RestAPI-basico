import { request, response } from "express";
import bcryptjs from "bcryptjs";
import { Usuario } from "../models/usuario.js";

export const usuariosGet = async(req = request, res = response) => {
    
    const { limite = 5 , desde = 0 } = req.query;
    const query = { estado: true }
    

    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find({ query })
          .skip( Number( desde ) )
          .limit( Number(limite) )
    ])

    res.json({
        total,
        usuarios
    })};

export const usuariosPut = async(req, res = response) => {

    const  id  = req.params.id;
    const { _id, password, google, correo,...resto } = req.body;

    //TODO validar contra DB

    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( usuario );
}

export const usuariosPost = async(req, res = response) => {


    const { nombre, correo, password, rol, estado } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol, estado } );

    //* Verificar si el correo existe
    

    //* Hacer hash de la password

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
        ok: true,
        msg: 'post API - controlador',
        usuario
    });
};

export const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;

    //? Borrar de forma fisica un registro
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});
    res.json({ usuario });
};

export const usuariosPatch = (req = request, res = response) => {

    const { id } = req.params;
    res.json({
        ok: true,
        msg: 'patch API - controlador',
        id
    });
};