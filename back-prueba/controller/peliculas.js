const conector = require("../models/conexion")
const projection = { };
class PeliculasController {
    async findAll(req, res) {
        try {
            let peliculas = await conector.get('movies',{
                $or: [{ title: {$regex: new RegExp(req.query.search), $options: 'i' } }, { fullplot: {$regex: new RegExp(req.query.search), $options: 'i' } }, { plot: {$regex: new RegExp(req.query.search), $options: 'i' } }]
              },{limit:req.query.limit,skip:req.query.offset,projection});
            let count = await conector.count('movies');
            return res.json({peliculas,count});
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la búsqueda"
            });
        }
    };
}

module.exports = new PeliculasController();