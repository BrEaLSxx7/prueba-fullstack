const conector = require("../models/conexion")
const projection = { };
class PeliculasController {
    async findAll(req, res) {
        try {
            const searchQuery = req.query.search || '';
            const limit = parseInt(req.query.limit, 10) || 0;
            const offset = parseInt(req.query.offset, 10) || 0;

            const regexQuery = {
                $or: [
                    { title: { $regex: new RegExp(searchQuery, 'i') } },
                    { fullplot: { $regex: new RegExp(searchQuery, 'i') } },
                    { plot: { $regex: new RegExp(searchQuery, 'i') } }
                ]
            };
            const peliculas = await conector.get('movies', regexQuery, { limit, skip: offset });
            const count = await conector.count('movies', regexQuery);
            return res.json({peliculas,count});
        } catch (err) {
            res.status(500).json({
                message: err.message || "Error when searching"
            });
        }
    };
}

module.exports = new PeliculasController();