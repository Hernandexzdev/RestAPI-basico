import { Router } from "express";
import { check } from "express-validator";
import colors from "colors";
import PrettyError from "pretty-error";
import  validarCampos  from "../middlewares/validar-campos.js";
import { esRolValido, emailExiste, existeUsuarioPorID } from "../helpers/db-validators.js";
import { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } from "../controllers/usuarios.controller.js";


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
                check('id', 'No es un ID Valido').isMongoId(),
                check('id').custom( existeUsuarioPorID ),
                check('rol').custom( esRolValido ),
                validarCampos
] ,usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener mas de 8 caracteres').isLength({ min: 8, max: 15}),
    check('correo').custom( emailExiste ),
    // check('rol', "No es un rol valido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos

],usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID Valido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
] ,usuariosDelete);

router.patch('/', usuariosPatch);

export default router;