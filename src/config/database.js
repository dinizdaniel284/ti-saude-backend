const mongoose = require("mongoose");

const conectarMongo = async () => {
  if (!process.env.MONGODB_URI) {
    console.error("❌ Erro: MONGODB_URI não está definido.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  }
};

module.exports = conectarMongo;
