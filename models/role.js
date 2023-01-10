import { Schema, model } from "mongoose";

const RoleSchema = Schema({
    rol: {
        type: String,
        required: 'El rol es obligatorio'
    }
}); 

export default model('Role', RoleSchema);