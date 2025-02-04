import mongoose, { Schema, model } from 'mongoose';

const gamesSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    desarrollador: {
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        enum: ['Acción', 'Aventura', 'RPG', 'Deportes', 'Estrategia', 'Simulación', 'Puzzle', 'Otro']
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    fecha_lanzamiento: {
        type: Date,
        required: true
    },
    plataforma: {
        type: [String],
        required: true,
        enum: ['PC', 'PlayStation', 'Xbox', 'Nintendo', 'Nintendo Switch', 'Wii U', 'Mobile', 'Otro']
    },
    imagenes: [{
        type: String
    }],
    videos: [{
        type: String
    }],
    estado: {
        type: Boolean,
        default: true
    },
    ventas: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

export default model('games', gamesSchema);
