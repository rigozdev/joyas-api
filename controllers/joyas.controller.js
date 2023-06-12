//! importación de conexión
import { handleErrors } from '../db/errorHandler.js';
//! importación de consultas en model
import { joyasModel } from '../models/joyas.model.js';



const getAllJoyas = async (req, res) => {
    //? todo aquí dentro de un try{}catch(){}

    const { sort, limit = 5, page = 1 } = req.query;

    try {
        const meta = await joyasModel.findAll({ sort, limit, page });
        return await res.status(200).json({ ok: true, meta });
    } catch (error) {
        console.error(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
};

const getOneJoya = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await joyasModel.findById({ id });
        return res.status(201).json({ ok: true, result });
    } catch (error) {
        console.error(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
}

const getAllJoyasFiltered = async (req, res) => {
    const { filters } = req.query;

    try {
        const result = await joyasModel.findMany({ filters });
        return res.json({ ok: true, result });
    } catch (error) {
        console.error(error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
};


export const joyasController = {
    getAllJoyas,
    getOneJoya,
    getAllJoyasFiltered
};