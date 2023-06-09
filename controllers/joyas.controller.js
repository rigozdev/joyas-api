//! importación de conexión
import { handleErrors } from '../db/errorHandler.js';
//! importación de consultas en model
import { joyasModel } from '../models/joyas.model.js';

const getAllJoyas = async (req, res) => {
    //? todo aquí dentro de un try{}catch(){}

    //const { limit } = req.query;//*traigo el limit por req.query
    // const { limit = 2 } = req.query; => se puede limitar 'por defecto'
    const { sort, limit } = req.query;

    try {
        const result = await joyasModel.findAll({ sort, limit });
        //console.log(Object.keys(sort)[0])
        //console.log(Object.values(sort)[0])
        return res.json({ ok: true, result });
        //return res.json(req.query);
    } catch (error) {
        console.error(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
};

// const getAllJoyas = async (req, res) => {
//     //? todo aquí dentro de un try{}catch(){}

//     const { limit } = req.query;//*traigo el limit por req.query
//     // const { limit = 2 } = req.query; => se puede limitar 'por defecto'
//     try {
//         const result = await joyasModel.findAll({ limit });
//         console.log(result)
//         return res.json({ ok: true, result });
//     } catch (error) {
//         console.error(error);
//         const { status, message } = handleErrors(error.code);
//         return res.status(status).json({ ok: false, result: message });
//     }
// };


export const joyasController = {
    getAllJoyas
};