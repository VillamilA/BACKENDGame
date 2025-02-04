import app from './src/server.js';

// Importar la función connection()
import connection from './src/database.js';

// Haicneod uso de la función connection()
connection()


app.listen(app.get('port'),()=>{
    console.log(`Server ok on http://localhost:${app.get('port')}`);
})

