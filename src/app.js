require("dotenv").config();
const express = require("express");
const cors = require("cors");

const conectarMongo = require("./src/config/database");
const quizRoutes = require("./src/routes/Quiz");
const comentariosRoutes = require("./src/routes/comentarios");
const usuariosRoutes = require("./src/routes/usuarios");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar MongoDB
conectarMongo();

// Rotas
app.use("/", quizRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/usuarios", usuariosRoutes);

// Start do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
