require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conectarMongo = require("./config/database");

// Importação das rotas (Garantindo nomes em minúsculo)
const quizRoutes = require("./routes/quiz");
const comentariosRoutes = require("./routes/comentarios");
const usuariosRoutes = require("./routes/usuarios");

const app = express();

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB (sem travar o fluxo principal)
conectarMongo().catch(err => console.error("Erro na conexão inicial:", err));

// Rota de teste (A Vercel precisa que isso responda rápido)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "API TI-Saúde online 🚀"
  });
});

// Rotas da API
app.use("/quiz", quizRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/usuarios", usuariosRoutes);

// Export para Vercel
module.exports = app;