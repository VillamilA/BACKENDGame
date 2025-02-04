import Jugadores from "../models/Jugadores.js";
import jwt from "jsonwebtoken";

const verificarAutenticacion = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "No hay token, autorización denegada" });
    }

    try {
        // Extraer el token quitando el "Bearer "
        const tokenLimpio = token.split(" ")[1];

        // Verificar el token con la misma clave usada para firmarlo
        const decoded = jwt.verify(tokenLimpio, process.env.JWT_SECRET);

        // Buscar al jugador en la base de datos
        const jugador = await Jugadores.findById(decoded.id).select("-password -__v");

        if (!jugador) {
            return res.status(404).json({ msg: "Jugador no encontrado" });
        }

        req.jugadoresBDD = jugador;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: "Token inválido" });
    }
};

export default verificarAutenticacion;
