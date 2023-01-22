import { validationResult } from "express-validator";


export const validarCampos = (req, res, next) => {

    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        return res.status(404).json(errors);
    }
    next(); //? Pasa al siguiente middleware
}

