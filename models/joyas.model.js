import format from "pg-format";
import { pool } from "../db/connection.js";

/*  
    Para hacer dinámica la query, necesitamos de un paquete distinto a pg,
    en este caso es necesario 'pg-format' para manipular valores en la query
*/

// ? instalación de pg-format => 'npm i pg-format'

export const findAll = async () => {

    const text = "SELECT * FROM inventario ORDER BY %s %s";
    const formattedQuery = format(text, 'nombre', 'asc')
    const { rows } = await pool.query(formattedQuery);
    return rows;
};
// export const findAll = async ({ limit }) => {
//     console.log(limit);
//     const text = "SELECT * FROM inventario LIMIT $1"
//     const { rows } = await pool.query(text, [limit]);
//     return rows;
// };

export const joyasModel = {
    findAll
};