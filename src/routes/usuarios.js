const express = require("express");
const router = express.Router();
const { criarUsuario, listarUsuarios, atualizarUsuario, deletarUsuario } = require("../controllers/usuariosController");

router.post("/", criarUsuario);
router.get("/", listarUsuarios);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

module.exports = router;
