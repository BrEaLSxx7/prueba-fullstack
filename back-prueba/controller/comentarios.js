const conector = require("../models/conexion");
const { ObjectId } = require('mongodb');
const projection = { };
class ComentariosController {
    async findByMovie(req, res) {
        try {
            let comentarios = await conector.get('comments',{movie_id:new ObjectId(req.query.id)},{});
            return res.json(comentarios);
        } catch (err) {
            res.status(500).send({
                message:
                    err.message || "Error al realizar la búsqueda"
            });
        }
    };
}

module.exports = new ComentariosController();