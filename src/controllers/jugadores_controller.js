import Jugadores from "../models/Jugadores.js";
import Games from "../models/Games.js";
import { sendMailTojugadores } from "../config/nodemailer.js";
import mongoose from "mongoose";
import generarJWT from "../helpers/crearJWT.js";

// Método para el proceso de login
const loginjugadores = async (req, res) => {
    const { email, password } = req.body;

    try {
        const jugadoresBDD = await Jugadores.findOne({ email });

        if (!jugadoresBDD) {
            return res.status(404).json({ msg: "El usuario no se encuentra registrado" });
        }

        const verificarPassword = await jugadoresBDD.matchPassword(password);

        if (!verificarPassword) {
            return res.status(400).json({ msg: "La contraseña es incorrecta" });
        }

        const token = generarJWT(jugadoresBDD._id);

        res.status(200).json({
            token,
            nombre: jugadoresBDD.nombre,
            email: jugadoresBDD.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// Método para ver el perfil
const perfiljugadores = (req, res) => {
    if (!req.jugadoresBDD) {
        return res.status(400).json({ error: "No se encontró la información del jugador." });
    }

    const perfil = req.jugadoresBDD.toObject();

    // Eliminar solo la contraseña y la versión del documento por seguridad
    delete perfil.password;
    delete perfil.__v;

    res.status(200).json(perfil);
};

// Método para listar todos los jugadores
const listarjugadoress = async (req, res) => {
    let jugadores;

    if (req.jugadoresBDD?.propietario) {
        jugadores = await Jugadores.find({ _id: req.jugadoresBDD._id })
            .select("-salida -createdAt -updatedAt -__v")
            .populate("admin", "_id nombre apellido");
    } else {
        jugadores = await Jugadores.find({ estado: true, admin: req.adminBDD })
            .select("-salida -createdAt -updatedAt -__v")
            .populate("admin", "_id nombre apellido");
    }

    res.status(200).json(jugadores);
};

// Método para ver el detalle de un jugador
// Método para ver el detalle de un jugador (sin juegos)
const detallejugadores = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: `Lo sentimos, el ID ${id} no es válido` });
        }

        // Buscar solo la información del jugador
        const jugador = await Jugadores.findById(id)
            .select("-createdAt -updatedAt -__v"); // Excluir campos innecesarios

        if (!jugador) {
            return res.status(404).json({ msg: `Lo sentimos, no existe el jugador con ID ${id}` });
        }

        res.status(200).json(jugador);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};



// Método para registrar un jugador
const registrarjugadores = async (req, res) => {
    try {
        const { email, nombre, password } = req.body;

        // Verificar que todos los campos estén completos
        if (!email || !nombre) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        // Verificar si el email ya está registrado
        const verificarEmailBDD = await Jugadores.findOne({ email });
        if (verificarEmailBDD) {
            return res.status(400).json({ msg: "El email ya está registrado" });
        }

        // Crear instancia del jugador
        const nuevoJugador = new Jugadores(req.body);

        // Si no se proporciona una contraseña, generar una aleatoria
        const nuevaPassword = password || "gam" + Math.random().toString(36).slice(2);
        nuevoJugador.password = await nuevoJugador.encrypPassword(nuevaPassword);

        // Guardar en la base de datos
        await nuevoJugador.save();

        // Enviar el correo con la contraseña generada (si aplica)
        if (!password) {
            await sendMailTojugadores(email, nuevaPassword);
        }

        res.status(201).json({ msg: "Registro exitoso del jugador" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor, intente más tarde" });
    }
};


// Método para actualizar un jugador
const actualizarjugadores = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el jugador con ID ${id}` });
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ msg: "No hay datos para actualizar" });
    }

    await Jugadores.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ msg: "Actualización exitosa del jugador" });
};

// Método para eliminar un jugador (marcar como inactivo)
const eliminarjugadores = async (req, res) => {
    const { id } = req.params;
    const { salida } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `Lo sentimos, no existe el jugador con ID ${id}` });
    }

    if (!salida) {
        return res.status(400).json({ msg: "Debes proporcionar una fecha de salida" });
    }

    await Jugadores.findByIdAndUpdate(id, { salida: new Date(salida), estado: false });

    res.status(200).json({ msg: "Fecha de salida del jugador registrada exitosamente" });
};

export {
    loginjugadores,
    perfiljugadores,
    listarjugadoress,
    detallejugadores,
    registrarjugadores,
    actualizarjugadores,
    eliminarjugadores
};
