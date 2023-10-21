const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const session = require("express-session");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const EventEmitter = require("events");
const { ACCES_CONTROL_URL, MP_ACCESS_TOKEN } = process.env;
const mercadopago = require("mercadopago");

require("./db.js");

const server = express();

server.use(
  session({
    secret: process.env.TOKEN_SECRET, // Reemplaza 'tu_secreto' por una cadena segura para firmar las cookies
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
    // Otras opciones de configuración si es necesario
  })
);

mercadopago.configure({
  access_token: MP_ACCESS_TOKEN,
});

server.name = "API";

const bus = new EventEmitter();
bus.setMaxListeners(20);

server.use(helmet());
server.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://http2.mlstatic.com"],
      // Otras directivas CSP que necesites configurar
    },
  })
);
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ACCES_CONTROL_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Authorization, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
