const api = { //prueba
  muebles: [
    {
      nombre: "Mesa de comedor",
      altura: "75 cm",
      peso: "20 kg",
      tipo_madera: "Roble",
    },
    {
      nombre: "Silla de cocina",
      altura: "85 cm",
      peso: "5 kg",
      tipo_madera: "Pino",
    },
  ],
};

const getMueblesControllers = async () => {
    const getApi = api;
    return getApi;
};

module.exports = {
  getMueblesControllers,
};
