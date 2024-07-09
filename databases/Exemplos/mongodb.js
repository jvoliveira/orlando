const { MongoClient } = require('mongodb');

async function main() {

    // Cria uma instância do MongoClient
    const client = new MongoClient('mongodb://localhost:27017');

    try {
        // Conecta ao servidor MongoDB
        await client.connect()
            .then(() => console.log('Conectado ao MongoDB'))
            .catch(err => console.error('Erro ao conectar ao MongoDB', err));

        // Seleciona o banco de dados
        const db = client.db('meubancodedados');

        // Seleciona a coleção (tabela) onde o dado será inserido
        const collection = db.collection('usuarios');

        // Dado que será inserido
        const usuario = {
            nome: "João Vitor Oliveira",
            usuario: "jvoliveira",
            senha: '123456'
        };

        // Insere o dado na coleção
        const result = await collection.insertOne(usuario);
        console.log('Usuario inserido com sucesso:', result);
    } catch (err) {
        console.error('Erro ao inserir Usuario no MongoDB', err);
    } finally {
        // Fecha a conexão com o MongoDB
        await client.close();
    }
}

main().catch(console.error);
