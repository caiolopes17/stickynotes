/**
 * Modelos de dados das notas
 * Criação da coleção
 */

// Importação dos recursos do moongose
const {model, Schema, version } = require('mongoose')

// Criação da estrutura da coleção
const noteSchema = new Schema({
    texto: {
        type: String
    },
    cor: {
        type: String
    }
}, { versionKey: false })

// exportar o modelo de dados para o main.js
module.exports = model('Notas', noteSchema)