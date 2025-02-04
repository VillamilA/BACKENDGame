// Importar Router de Express
import {Router} from 'express'

// Crear una instancia de Router() 
const router = Router()

// Importar los métodos del controlador 
import {
    login,
    perfil,
    registro,
    confirmEmail,
    listaradmin,
    detalleadmin,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword,
} from "../controllers/admin_controller.js";
import verificarAutenticacion from '../middlewares/autenticacion.js';


import { validacionadmin } from '../middlewares/validacionadmin.js';


// Rutas publicas   
router.post("/login", login);
router.post("/registro", registro);
router.get("/confirmar/:token", confirmEmail);
router.get("/admins", listaradmin);
router.post("/recuperar-password", recuperarPassword);
router.get("/recuperar-password/:token", comprobarTokenPasword);
router.post("/nuevo-password/:token", nuevoPassword);



// Rutas privadas
router.get("/perfil",verificarAutenticacion , perfil,);
router.put('/admin/actualizarpassword',verificarAutenticacion, actualizarPassword)
router.get("/admin/:id", verificarAutenticacion, detalleadmin);
router.put("/admin/:id", verificarAutenticacion, actualizarPerfil);


// Exportar la variable router
export default router






