const express = require("express");
const router = express.Router();
const { criarComentario, listarComentarios } = require("../controllers/comentariosController");

router.post("/", criarComentario);
router.get("/", listarComentarios);

module.exports = router;
