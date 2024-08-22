const conector = require("../models/conexion")
const projection = { poster: 1, title: 1, plot: 1, year: 1, rated: 1, genres: 1, runtime: 1 };
class PeliculasController {
    async findAll(req, res) {
        console.log()
        try {
            let peliculas = await conector.get('movies',{},{limit:req.query.limit,skip:req.query.offset,projection});
            return res.json(peliculas);
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la búsqueda"
            });
        }
    };
}

module.exports = new PeliculasController();