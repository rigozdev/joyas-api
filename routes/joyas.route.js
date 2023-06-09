import { Router } from "express";
//import { joyasModel } from "../models/joyas.model.js";
import { joyasController } from "../controllers/joyas.controller.js";


const router = Router(); //! se crea instanca de router desde express


router.get('/joyas', joyasController.getAllJoyas);

export default router;//!exportamos por defecto hacia index.js
//! esto con el fin de creación de middleware