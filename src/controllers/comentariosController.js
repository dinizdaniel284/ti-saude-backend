const Comment = require("../models/Comment");
const { enviarEmail } = require("../services/emailService");

const criarComentario = async (req, res) => {
  const { nome, email, comentario } = req.body;
  try {
    const novoComentario = new Comment({ nome, email, comentario });
    await novoComentario.save();

    await enviarEmail({
      to: process.env.EMAIL_ADMIN,
      subject: "Novo Comentário Recebido",
      text: `Nome: ${nome}\nEmail: ${email}\nComentário: ${comentario}`,
    });

    res.status(201).json({ message: "Comentário enviado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar comentário" });
  }
};

const listarComentarios = async (req, res) => {
  try {
    const comentarios = await Comment.find();
    res.status(200).json(comentarios);
  } catch {
    res.status(500).json({ error: "Erro ao buscar comentários" });
  }
};

module.exports = { criarComentario, listarComentarios };
