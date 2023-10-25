const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const gmailUser = process.env.MAILING_AUTH_USER;
const gmailAppPassword = process.env.MAILING_AUTH_PASSWORD;

// La funcion recibe e_mail y user_name como valores del usuario, y emailType como tipo de email que
// sera enviado, que podra ser welcome, newPassword o orderReceipt
const nodeMailerConfig = async (
  e_mail,
  user_name,
  emailType = "welcome",
  resetPassURL,
  orderWithCart
) => {
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

  let htmlToSend = null;

  // Obtén la ruta absoluta al directorio que contiene nodeMailerConfig.js
  const directorioActual = path.dirname(__filename);

  if (emailType === "welcome") {
    // Construye la ruta absoluta al archivo welcomeEmail.html
    const rutaAlEmailTemplate = path.join(
      directorioActual,
      "emailTemplates",
      "welcomeEmail.html"
    );
    const source = fs.readFileSync(rutaAlEmailTemplate, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      user_name: user_name,
    };
    htmlToSend = template(replacements);
  }
  if (emailType === "orderReceipt") {
    // Construye la ruta absoluta al archivo orderReceipt.html
    const rutaAlEmailTemplate = path.join(
      directorioActual,
      "emailTemplates",
      "orderReceipt.html"
    );
    const source = fs.readFileSync(rutaAlEmailTemplate, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      orderId: orderWithCart.mercadoPagoId,
      saleDate: orderWithCart.saleDate,
      payment_type: orderWithCart,
      e_mail: e_mail,
      user_name: user_name,
      products: orderWithCart.cartInfo.products,
      total_amount: orderWithCart.cartInfo.total_amount,
    };

    htmlToSend = template(replacements);
  }
  if (emailType === "newPassword") {
    // Construye la ruta absoluta al archivo welcomeEmail.html
    const rutaAlEmailTemplate = path.join(
      directorioActual,
      "emailTemplates",
      "newPasswordEmail.html"
    );
    const source = fs.readFileSync(rutaAlEmailTemplate, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      resetPassURL: resetPassURL,
    };
    htmlToSend = template(replacements);
  }

  await transporter.sendMail({
    from: `"MSC Amoblamientos 👻" ${gmailUser}`,
    to: e_mail,
    subject: "MSC Amoblamientos",
    html: htmlToSend,
  });
};
module.exports = { nodeMailerConfig };
