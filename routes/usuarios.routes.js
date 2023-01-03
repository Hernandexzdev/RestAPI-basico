import { Router } from "express";
import { usuariosGet, usuariosPut, usuariosPost, usuariosPatch, usuariosDelete } from "../controllers/usuarios.controller.js";

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

export default router;