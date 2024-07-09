let mongoose = require("mongoose")
let credentials = require("../config/dbCredentials")

class MongooseDatabase {
    constructor(model, schema) {
        this.model = mongoose.model(model, schema);
        this.connect(`mongodb://${credentials.host}:${credentials.port}/${credentials.database}`)
    }

    async connect(url) {
        mongoose.connect(url)
            .then(() => console.log('Conectado ao MongoDB'))
            .catch(err => console.error('Erro ao conectar ao MongoDB', err));
    }

    async disconnect() {
        mongoose.connection.close();
    }

    // Método para criar um novo documento
    async create(data) {
        const document = new this.model(data);
        try {
            const result = await document.save();
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Método para ler documentos
    async read(filter = {}) {
        try {
            const results = await this.model.find(filter);
            return results;
        } catch (err) {
            throw err;
        }
    }

    // Método para atualizar um documento
    async update(id, data) {
        try {
            const result = await this.model.findByIdAndUpdate(id, data, { new: true });
            return result;
        } catch (err) {
            throw err;
        }
    }

    // Método para deletar um documento
    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

// Exporta a classe instanciada com o modelo Dado
module.exports = MongooseDatabase;
