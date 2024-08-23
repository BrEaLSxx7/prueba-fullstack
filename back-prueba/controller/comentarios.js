const conector = require("../models/conexion");
const { ObjectId } = require('mongodb');
const projection = { };
class ComentariosController {
    async findByMovie(req, res) {
        try {
            if (!req.query.id) {
                return res.status(400).json({
                    message: "El parámetro 'id' es requerido."
                });
            }
            let movieId;
            try {
                movieId = new ObjectId(req.query.id);
            } catch (err) {
                return res.status(400).json({
                    message: "The 'id' format is not valid."
                });
            }
            const comentarios = await conector.get('comments', { movie_id: movieId });

            return res.json(comentarios);
        } catch (err) {
            res.status(500).json({
                message: err.message || "Error when searching"
            });
        }
    };
}

module.exports = new ComentariosController();