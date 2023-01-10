import {Schema, model} from "mongoose";


const usuarioSchema =  Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']

    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        dafault: true

    },
    google: {
        type: Boolean,
        default: true
    }

})

usuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario} = this.toObject();

    return usuario;
    
}

export const Usuario = model('Usuarios', usuarioSchema);