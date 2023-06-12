import format from "pg-format";
import { pool } from "../db/connection.js";
import { PORT } from '../index.js';


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
        arrayValores.push((page - 1) * limit);
    }

    const formattedQuery = format(baseQuery, ...arrayValores);

    const hateoasText = "SELECT * FROM inventario"

    const { rows } = await pool.query(formattedQuery);
    const { rows: data } = await pool.query(hateoasText);
    const total_pages = Math.ceil(data.length / limit);

    const results = rows.map((row) => {
        return {
            name: row.nombre,
            url: `http://localhost:${PORT}/joyas/${row.id}`
        }
    });
    const finalAnswer = {
        count: data.length,
        page: parseInt(page),
        total_pages: total_pages,
        limit: parseInt(limit),
        next: total_pages <= page ? null : `http://localhost:${PORT}/joyas?limit?${limit}&page=${parseInt(page) + 1}`,
        previous: page <= 1 ? null : `http://localhost:${PORT}/joyas?limit?${limit}&page=${parseInt(page) - 1}`,
        results
    }

    return finalAnswer;
    
};

export const findMany = async ({ filters }) => {
    let baseQuery = "SELECT * FROM inventario ";
    const arrayValores = [];
    console.log(arrayValores);
    if (filters) {
        baseQuery += " WHERE ";
        console.log(filters + 'as')
        const propiedades = Object.keys(filters);
        console.log(propiedades)

        const operadoresDeFiltro = {
            $eq: "=",
            $gt: ">",
            $gte: ">=",
            $lt: "<",
            $lte: "<=",
            $ne: "!="
        }


        for (const key in filters) {
            const name = key;
            const object = filters[name];
            const operator = Object.keys(object)[0];
            const value = object[operator];

            baseQuery += "%s %s '%s'";
            arrayValores.push(name, operadoresDeFiltro[operator], value);
            console.log(arrayValores);

            if (key !== propiedades[propiedades.length - 1]) {
                baseQuery += " AND ";
            }
        }
    }


    const formattedQuery = format(baseQuery, ...arrayValores);
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
    findAll,
    findMany
};