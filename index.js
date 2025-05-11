require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const quizRoutes = require('./routes/quiz');
const User = require("./models/User");
const Comment = require("./models/Comment");

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

// Rotas
app.use('/', quizRoutes);

// Rotas de usuário
app.post("/usuarios", async (req, res) => {
  const { nome, idade, profissao, interesse } = req.body;

  try {
    const novoUsuario = new User({ nome, idade, profissao, interesse });
    await novoUsuario.save();
    console.log("✅ Usuário criado com sucesso!");
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error);
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
});

// Rotas para comentar e enviar e-mails
app.post("/comentarios", async (req, res) => {
  const { nome, email, comentario } = req.body;

  try {
    // Salvar comentário no banco de dados
    const novoComentario = new Comment({ nome, email, comentario });
    await novoComentario.save();

    // Enviar e-mail para o administrador (opcional)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_ADMIN,
      subject: "Novo Comentário Recebido",
      text: `Nome: ${nome}\nEmail: ${email}\nComentário: ${comentario}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Erro ao enviar e-mail:", error);
        return res.status(500).json({ error: "Erro ao enviar e-mail" });
      }
      console.log("✅ E-mail enviado:", info.response);
    });

    res.status(201).json({ message: "Comentário enviado com sucesso!" });
  } catch (error) {
    console.error("❌ Erro ao salvar comentário:", error);
    res.status(500).json({ error: "Erro ao salvar comentário" });
  }
});

// Rota para buscar todos os comentários
app.get("/comentarios", async (req, res) => {
  try {
    const comentarios = await Comment.find();
    res.status(200).json(comentarios);
  } catch (error) {
    console.error("❌ Erro ao buscar comentários:", error);
    res.status(500).json({ error: "Erro ao buscar comentários" });
  }
});

// Outras rotas de usuário
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("❌ Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Atualizar, deletar e buscar usuários
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});