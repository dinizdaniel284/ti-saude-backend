const mongoose = require("mongoose");

const conectarMongo = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("❌ Erro: MONGO_URI não está definido no Secret Files.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      // Essas opções já são padrão na versão 4+, mas não faz mal reforçar
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado ao MongoDB Atlas com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = conectarMongo;
