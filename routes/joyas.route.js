import { Router } from "express";
//import { joyasModel } from "../models/joyas.model.js";
import { joyasController } from "../controllers/joyas.controller.js";
import { requestReport } from "../middlewares/requestReport.js";


const router = Router(); //! se crea instanca de router desde express


router.get('/joyas', requestReport, joyasController.getAllJoyas);
router.get('/joyas/:id', joyasController.getOneJoya);
router.get('/joyas/filter', joyasController.getAllJoyasFiltered);

export default router;//!exportamos por defecto hacia index.js
//! esto con el fin de creación de middleware