require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Caminho para o database
const conectarMongo = require("./config/database");

// Rotas
const quizRoutes = require("./routes/Quiz");
const comentariosRoutes = require("./routes/comentarios");
const usuariosRoutes = require("./routes/usuarios");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar MongoDB
(async () => {
  try {
    await conectarMongo();
    console.log("🚀 MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
  }
})();

// Rota inicial para teste
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API TI-Saúde online 🚀"
  });
});

// Definição das Rotas
app.use("/quiz", quizRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/usuarios", usuariosRoutes);

// Start do servidor (Apenas se não estiver na Vercel/Produção)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Servidor rodando localmente na porta ${PORT}`));
}

// Exportação crucial para a Vercel funcionar como Serverless
module.exports = app;