import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Jugadores from "../models/Jugadores.js";

const verificarAutenticacion = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "No hay token, autorización denegada" });
    }

    try {
        // Extraer el token quitando el "Bearer "
        const tokenLimpio = token.split(" ")[1];

        // Verificar el token
        const { id, rol } = jwt.verify(tokenLimpio, process.env.JWT_SECRET);

        let usuario;

        if (rol === "admin") {
            usuario = await Admin.findById(id).lean().select("-password");
            if (!usuario) return res.status(404).json({ msg: "Administrador no encontrado" });

            req.adminBDD = usuario;
        } else if (rol === "jugador") {
            usuario = await Jugadores.findById(id).lean().select("-password");
            if (!usuario) return res.status(404).json({ msg: "Jugador no encontrado" });

            req.jugadoresBDD = usuario;
        } else {
            return res.status(403).json({ msg: "Rol no autorizado" });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ msg: "Token inválido" });
    }
};

export default verificarAutenticacion;
