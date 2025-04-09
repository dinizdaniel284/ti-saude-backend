// Importando módulos
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Quiz = require("./models/Quiz");
const User = require("./models/User");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("Erro: MONGO_URI não está definido no ambiente.");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });

// Rota do Quiz
app.get("/quiz", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ titulo: "Quiz de Áreas de TI" });

    if (!quiz) {
      const novoQuiz = new Quiz({
        titulo: "Quiz de Áreas de TI",
        perguntas: [], // Certifique-se de preencher corretamente
      });

      await novoQuiz.save();
      console.log("✅ Quiz inicial salvo com sucesso!");
      return res.json(novoQuiz);
    }

    res.json(quiz);
  } catch (error) {
    console.error("❌ Erro ao buscar quiz:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});

// Rota para deletar quiz
app.delete("/quiz", async (req, res) => {
  try {
    const resultado = await Quiz.deleteOne({ titulo: "Quiz de Áreas de TI" });
    if (resultado.deletedCount > 0) {
      console.log("✅ Quiz deletado com sucesso!");
      res.status(200).json({ message: "Quiz deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Nenhum quiz encontrado para deletar." });
    }
  } catch (err) {
    console.error("❌ Erro ao deletar quiz:", err);
    res.status(500).json({ error: "Erro ao deletar quiz" });
  }
});

// Rota para criar um novo usuário
app.post("/usuarios", async (req, res) => {
  const { nome, idade, profissao, interesse } = req.body;

  try {
    const novoUsuario = new User({
      nome,
      idade,
      profissao,
      interesse,
    });

    await novoUsuario.save();
    console.log("✅ Usuário criado com sucesso!");
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error);
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
});

// Rota para listar todos os usuários
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("❌ Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Rota para buscar um usuário por ID
app.get("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("❌ Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

// Rota para atualizar um usuário
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, idade, profissao, interesse } = req.body;

  try {
    const usuarioAtualizado = await User.findByIdAndUpdate(
      id,
      { nome, idade, profissao, interesse },
      { new: true }
    );

    if (!usuarioAtualizado) {
      return res.status(404).json({ message: "Usuário não encontrado para atualização" });
    }

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.error("❌ Erro ao atualizar usuário:", error);
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
});

// Rota para deletar um usuário
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await User.deleteOne({ _id: id });
    if (resultado.deletedCount > 0) {
      console.log("✅ Usuário deletado com sucesso!");
      res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado para deletar" });
    }
  } catch (error) {
    console.error("❌ Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

// Definir a porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});