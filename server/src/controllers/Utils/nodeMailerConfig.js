const nodemailer = require("nodemailer");

const gmailUser = process.env.MAILING_AUTH_USER;
const gmailAppPassword = process.env.MAILING_AUTH_PASSWORD;

const nodeMailerConfig = async (e_mail) => {
  // Configuracion de mail para enviar al usuario recien creado
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: `"MSC Amoblamientos 👻" ${gmailUser}`,
    to: e_mail,
    subject: "Bienvenido a MSC Amoblamientos!",
    text: "Hoooliiiissssssss!!!",
  });
};
module.exports = { nodeMailerConfig };
