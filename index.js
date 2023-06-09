import * as dotenv from 'dotenv';
dotenv.config();//! importación de dotenv (variables de entorno en .env)

import express from 'express'; // ! importación de express

import joyasRouter from './routes/joyas.route.js';
const app = express(); // * creación instancia app


app.use('', joyasRouter);//!middleware que antepone ruta '/api'
//! se logra importando por defecto desde joyas.router.js

/* ---------------------Escucha de puerto---------------------- */
const PORT = process.env.PORT || 2100;
app.listen(PORT, () => {
    console.log('Escuchando peticiones en: http://localhost:' + PORT);
});