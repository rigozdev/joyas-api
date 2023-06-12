export const requestReport = async (req, res, next) => {


    if (req.query) {
        const parametros = req.query
        const url = req.url
        console.log(`Hoy ${new Date()}, se ha recibido una consulta en la ruta ${url} con los parámetros:`, parametros);
        next();
    }else{
        return res.status(400).json({ok:false, msg: 'request denegada por problemas en la query'});
    }
}