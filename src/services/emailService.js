const transporter = require("../config/email");

const enviarEmail = async ({ to, subject, text }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("📩 E-mail enviado com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao enviar e-mail:", err);
  }
};

module.exports = { enviarEmail };
