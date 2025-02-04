// Importar el Schema y el modelo de mongoose
import {Schema, model} from 'mongoose'
// Importar bcrypt para cifrar las contraseñas
import bcrypt from "bcryptjs"


// Crear el Schema "atributos de la tabla de la BDD"
const adminSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    telefono:{
        type:Number,
        trim:true,
        default:null
    },
    email:{
        type:String,
        require:true,
        trim:true,
		unique:true
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    rol:{
        type:String,
        default:"admin"
    }

},{
    timestamps:true
})

// Método para cifrar el password del admin
adminSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
adminSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}

// Método para crear un token 
adminSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

// Crear el Modelo admin "Tabla BDD" en base al esquema llamado adminSchema
// Luego exportar el modelo
export default model('admin',adminSchema)