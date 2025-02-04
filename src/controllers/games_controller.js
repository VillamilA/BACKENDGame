import mongoose from "mongoose";
import Games from "../models/Games.js";

// Obtener detalle del juego
const detallegames = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Lo sentimos, no existe ese juego" });
        }

        const game = await Games.findById(id);
        if (!game) {
            return res.status(404).json({ msg: "Juego no encontrado" });
        }

        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// Crear un nuevo juego
const registrargames = async (req, res) => {
    const { jugadores } = req.body;

    // Validar si jugadores es un array o un ID único
    if (jugadores) {
        if (Array.isArray(jugadores)) {
            for (let id of jugadores) {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(400).json({ msg: "Uno o más jugadores tienen un ID no válido" });
                }
            }
        } else {
            if (!mongoose.Types.ObjectId.isValid(jugadores)) {
                return res.status(400).json({ msg: "Debe ser un ID válido" });
            }
        }
    }

    try {
        const game = await Games.create(req.body);
        res.status(201).json({ msg: `Registro exitoso del juego ${game._id}`, game });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// Actualizar un juego
const actualizargames = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: `Lo sentimos, no existe el juego ${id}` });
        }

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "Debes proporcionar al menos un campo para actualizar" });
        }

        const game = await Games.findByIdAndUpdate(id, req.body, { new: true });
        if (!game) {
            return res.status(404).json({ msg: "Juego no encontrado" });
        }

        res.status(200).json({ msg: "Actualización exitosa del juego", game });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// Eliminar un juego
const eliminargames = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Lo sentimos, no existe ese juego" });
        }

        const game = await Games.findByIdAndDelete(id);
        if (!game) {
            return res.status(404).json({ msg: "Juego no encontrado" });
        }

        res.status(200).json({ msg: "Juego eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

// Cambiar el estado del juego
const cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Lo sentimos, no existe ese juego" });
        }

        const game = await Games.findByIdAndUpdate(id, { estado: false }, { new: true });
        if (!game) {
            return res.status(404).json({ msg: "Juego no encontrado" });
        }

        res.status(200).json({ msg: "Estado del juego modificado exitosamente", game });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
};

export {
    detallegames,
    registrargames,
    actualizargames,
    eliminargames,
    cambiarEstado
};
