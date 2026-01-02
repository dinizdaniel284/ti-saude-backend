const mongoose = require("mongoose");

const conectarMongo = async () => {
  // Ajustado para MONGODB_URI para bater com o nome no painel da Vercel
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("❌ Erro: MONGODB_URI não está definido no painel da Vercel.");
    // Na Vercel, não usamos process.exit(1) pois derruba a instância serverless de forma brusca
    throw new Error("Variável MONGODB_URI ausente");
  }

  try {
    // Versões recentes do Mongoose não precisam mais de useNewUrlParser e useUnifiedTopology
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado ao MongoDB Atlas com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    throw err;
  }
};

module.exports = conectarMongo;