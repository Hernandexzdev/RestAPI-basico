import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.post('/login', [
     check('correo', 'El correo es obligatorio').isEmail(),
     check('password', 'La contraseña es obligatoria').not().isEmpty(),
     validarCampos
],login)

router.post('/google', [
     check('id_token', 'El id_token de google es necesario').not().isEmpty(),
     validarCampos
],googleSignIn)


export default router;