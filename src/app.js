require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Conexão com o Banco de Dados
const conectarMongo = require("./config/database");

// Definição das Rotas
// AJUSTE: Importando com nomes em minúsculo para evitar erro no Linux da Vercel
const quizRoutes = require("./routes/quiz");
const comentariosRoutes = require("./routes/comentarios");
const usuariosRoutes = require("./routes/usuarios");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Inicializar conexão com MongoDB de forma global
(async () => {
  try {
    await conectarMongo();
    console.log("🚀 MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao MongoDB:", error);
  }
})();

// Rota de teste para verificar se o servidor está respondendo
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API TI-Saúde online 🚀",
    environment: process.env.NODE_ENV || "development"
  });
});

// Configuração dos caminhos das Rotas
app.use("/quiz", quizRoutes);
app.use("/comentarios", comentariosRoutes);
app.use("/usuarios", usuariosRoutes);

// Gerenciamento do Servidor: Só roda app.listen se NÃO estiver na Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Servidor local rodando na porta ${PORT}`));
}

// Exportação obrigatória para a Vercel
module.exports = app;