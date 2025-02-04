
import mongoose from 'mongoose'


// Pertimitir que solo los campos definidos en el Schema sean actualizados en la BDD
mongoose.set('strictQuery', true)


// Crear  connection()
const connection = async()=>{
    try {
        // Establecer LA conexión  BDD
        const {connection} = await mongoose.connect(process.env.MONGODB_URI)
        
        // Presentar la conexión en consola 
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
    
    } catch (error) {
        // Capturar Error en la conexión
        console.log(error);
    }
}

//Exportar la connection
export default  connection