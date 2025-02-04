import {Router} from 'express'
const router = Router()

import {
    detallegames,
    registrargames,
    actualizargames,
    eliminargames,
    cambiarEstado
} from "../controllers/games_controller.js";

import verificarAutenticacion from "../middlewares/autenticacion.js";


// Ruta para crear el games
router.post('/games/registro',verificarAutenticacion,registrargames)

// Ruta para ver el detalle del games
router.get('/games/:id',verificarAutenticacion,detallegames)

// Ruta para actualizar el games
router.put('/games/:id',verificarAutenticacion,actualizargames)

// Ruta para eliminar el games
router.delete('/games/:id',verificarAutenticacion,eliminargames)


// Ruta para cambiar el estado del games
router.post('/games/estado/:id',verificarAutenticacion,cambiarEstado)




export default router