import { Router } from "express";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {  tieneRole } from "../middlewares/validar-roles.js";
import { esRolValido, emailExiste, existeUsuarioPorID } from "../helpers/db-validators.js";
import { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } from "../controllers/usuarios.controller.js";



const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
                param('id', 'No es un ID Valido').isMongoId(),
                param('id').custom( existeUsuarioPorID ),
                body('rol').custom( esRolValido ),
                validarCampos
] ,usuariosPut);

router.post('/', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'La contraseña es obligatoria y debe tener mas de 8 caracteres').isLength({ min: 8, max: 15}),
    body('correo').custom( emailExiste ),
    // check('rol', "No es un rol valido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    body('rol').custom( esRolValido ),
    validarCampos

],usuariosPost);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    param('id', 'No es un ID Valido').isMongoId(),
    param('id').custom( existeUsuarioPorID ),
    validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPatch);

export default router;