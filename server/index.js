// const express = require("express");
// const server = require("./server");

// const PORT = 3001;

// server.listen(PORT, () => {//se inicia el servidor
//   console.log(`Server listening on port ${PORT}`);
// })

const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: false, alter: true }).then(() => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });

