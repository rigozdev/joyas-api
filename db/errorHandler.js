export const handleErrors = (code) => {
    if (!code) {
        return {
            status: 500,
            message: "Error de servidor, código desconocido."
        };
    };
    switch (code) {
        case '22P02':
            return {
                status: 400,
                message: "Formato no válido en el parámetro."
            }
        case '42601':
            return {
                status: 400,
                message: "Error en consulta a bd"
            }
        case '400':
            return {
                status: 400,
                message: "Faltan datos en la petición."
            }
        case '404':
            return {
                status: 404,
                message: "No existe este registro."
            }
        default:
            return {
                status: 500,
                message: "Error de servidor."
            };
    }
};