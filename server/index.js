const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ alter: true, force: false }).then(() => {
  server.listen(3001, () => {
    console.log("Server listening at 3001");
  });
});
