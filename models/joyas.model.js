import format from "pg-format";
import { pool } from "../db/connection.js";

/*  
    Para hacer dinámica la query, necesitamos de un paquete distinto a pg,
    en este caso es necesario 'pg-format' para manipular valores en la query
*/

// ? instalación de pg-format => 'npm i pg-format'

export const findAll = async ({ sort, limit, page }) => {

    let baseQuery = "SELECT * FROM inventario ";
    const arrayValores = [];

    if (sort) {
        const nombrePropiedad = Object.keys(sort)[0];//* nombre de propiedad(llave)
        const nombreValor = Object.values(sort)[0];//* nombre de valor(value)
        baseQuery += "ORDER BY %s %s "
        arrayValores.push(nombrePropiedad, nombreValor);
    }

    if (limit) {
        baseQuery += "LIMIT %s ";
        arrayValores.push(limit);
    }

    if (page) {
        baseQuery += "Offset %s";
        arrayValores.push((page - 1)* limit);
    }

    const formattedQuery = format(baseQuery, ...arrayValores);

    const result = await pool.query(formattedQuery);
    return result;
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