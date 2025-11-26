const User = require("../models/User");

const criarUsuario = async (req, res) => {
  const { nome, idade, profissao, interesse } = req.body;
  try {
    const novoUsuario = new User({ nome, idade, profissao, interesse });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch {
    res.status(400).json({ error: "Erro ao criar usuário" });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.status(200).json(usuarios);
  } catch {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, profissao, interesse } = req.body;

  try {
    const usuarioAtualizado = await User.findByIdAndUpdate(
      id,
      { nome, idade, profissao, interesse },
      { new: true }
    );
    if (!usuarioAtualizado) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json(usuarioAtualizado);
  } catch {
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
};

const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await User.deleteOne({ _id: id });
    if (!resultado.deletedCount) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch {
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

module.exports = { criarUsuario, listarUsuarios, atualizarUsuario, deletarUsuario };
