import Role from "../models/role.js";
import  { Usuario }  from "../models/usuario.js";

export const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne( { rol } );
    if ( !existeRol ) {
         
        throw new  Error (`El rol ${ rol } no esta registrado en la base de datos`)
        
    }
}

export const emailExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {

            throw new Error (`El correo ${ correo } que intenta ingresar ya esta registrado`)
        
    }
}

export const existeUsuarioPorID = async( id ) => {

    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) {

            throw new Error (`El usuario con el ID ${ id } que intenta actualizar no se encuentra en la DB`)
        
    }
}