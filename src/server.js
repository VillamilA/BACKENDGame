
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

// Importar  routeradmin
import routeradmin from './routers/admin_routes.js'
// Importar routerjugadores
import routerjugadores from './routers/jugadores_routes.js'
// Importar routerjugadores
import routergames from './routers/games_routes.js'

// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
})
// Middlewares 
app.use(express.json())

// Rutas 
app.use('/api',routeradmin)
app.use('/api',routerjugadores)
app.use('/api',routergames)



// ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar
export default  app