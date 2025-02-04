import {Router} from 'express'
const router = Router()

import {
    actualizarjugadores,
    detallejugadores,
    eliminarjugadores,
    listarjugadoress,
    registrarjugadores,
    loginjugadores,
    perfiljugadores 
} from "../controllers/jugadores_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";


router.post('/jugadores/login',loginjugadores)

router.get('/jugadores/perfil',verificarAutenticacion,perfiljugadores)
router.get("/jugadoress",verificarAutenticacion,listarjugadoress);
router.get("/jugadores/:id",verificarAutenticacion, detallejugadores);
router.post("/jugadores/registro", registrarjugadores);
router.put("/jugadores/actualizar/:id", verificarAutenticacion,actualizarjugadores);
router.delete("/jugadores/eliminar/:id", verificarAutenticacion,eliminarjugadores);







export default router