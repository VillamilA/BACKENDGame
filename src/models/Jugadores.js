import mongoose, {Schema,model} from 'mongoose'
import bcrypt from "bcryptjs"

const jugadoresSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    celular:{
        type:String,
        require:true,
        trim:true
    },
    convencional:{
        type:String,
        require:true,
        trim:true
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'admin'
    },
    rol:{
        type:String,
        default:"jugadores"
    }
},{
    timestamps:true
})


// Método para cifrar el password del jugadores
jugadoresSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

// Método para verificar si el password ingresado es el mismo de la BDD
jugadoresSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}


export default model('Jugadores',jugadoresSchema)