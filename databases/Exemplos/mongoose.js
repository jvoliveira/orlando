let mongoose = require("mongoose")

async function main() {
    // Conecta ao MongoDB
    mongoose.connect('mongodb://localhost:27017/meubancodedados')
        .then(() => console.log('Conectado ao MongoDB'))
        .catch(err => console.error('Erro ao conectar ao MongoDB', err));

    // Define um esquema (schema) Aqui você pode restringir os tipos de dados que podem ser salvos
    const usuarioSchema = new mongoose.Schema({
        nome: { type: String, required: true },
        usuario: { type: String, required: true },
        senha: { type: Number, required: true }
    });

    // Cria um model baseado no esquema (será a tabela do banco)
    const Usuario = mongoose.model('usuarios', usuarioSchema);


    // Usuario que será inserido
    const novoUsuario = new Usuario({
        nome: 'Orlando',
        usuario: 'opcefet',
        senha: 123456
    });

    try {
        // Salva o Usuario no banco de Usuarios
        const result = await novoUsuario.save();
        console.log('Usuario inserido com sucesso:', result);
    } catch (err) {
        console.error('Erro ao inserir Usuario no MongoDB', err);
    } finally {
        // Fecha a conexão com o MongoDB
        mongoose.connection.close();
    }
}

main().catch(console.error);
