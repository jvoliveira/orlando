var express = require('express');
var router = express.Router();
let UsuarioController = require("../controller/usuarioController")

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let response = await UsuarioController.read(req, res);
  res.send(response);
});

router.post('/cadastrar', async function (req, res, next) {

  let response = await UsuarioController.create(req, res)
  res.send(response)

})

module.exports = router;
