import { response } from "express";

export const usuariosGet = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'get API - controlador'
    })};

export const usuariosPut = (req, res = response) => {
    const  id  = req.params.id;
    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    });
}

export const usuariosPost = (req, res = response) => {

    const body = req.body;

    res.status(201).json({
        ok: true,
        msg: 'post API - controlador',
        body
    });
};

export const usuariosDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    });
};

export const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
};