const Usuario = require('../model/usuario/usuario');
const MongooseDatabase = require("../databases/mongoose")
const UsuarioSchema = require("../model/usuario/usuarioSchema")

class UsuarioController {

    constructor() {
        this.database = new MongooseDatabase("usuario", UsuarioSchema)
    }


    // Método para criar um novo usuário
    async create(req, res) {
        try {
            let nome = req.body.nome
            let usuario = req.body.usuario
            let senha = req.body.senha


            let user = new Usuario(nome, usuario, senha)
            const novoUsuario = await this.database.create(user);
            res.status(201).json(novoUsuario);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Método para ler usuários
    async read(req, res) {
        try {
            const usuarios = await this.database.read(req.query);
            res.status(200).json(usuarios);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Método para atualizar um usuário
    async update(req, res) {
        try {
            const usuarioAtualizado = await this.database.update(req.params.id, req.body);
            if (!usuarioAtualizado) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(usuarioAtualizado);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    // Método para deletar um usuário
    async delete(req, res) {
        try {
            const usuarioDeletado = await this.database.delete(req.params.id);
            if (!usuarioDeletado) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).json(usuarioDeletado);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new UsuarioController();
