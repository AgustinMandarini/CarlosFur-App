import Card from "../Card/Card"; //correcion
import "./Cardscontainer.style.css"


const CardsContainer = () => {
  const muebles = [
    {
        "id": 1,
        "nombre": "Mesa de comedor",
        "precio": 5000,
        "altura": 75,
        "profundidad": 20,
        "ancho": 40,
        "peso": 20,
        "color": "Blanco",
        "descripcion": "Es una mesa muy linda y muy bonita"
    },
    {
        "id": 2,
        "nombre": "Silla de cocina",
        "precio": 2000,
        "altura": 50,
        "profundidad": 10,
        "ancho": 30,
        "peso": 8,
        "color": "Ocre",
        "descripcion": "Una fantastica silla para sus cachas"
    },
    {
        "id": 3,
        "nombre": "Sofá de cuero",
        "precio": 50000,
        "altura": 60,
        "profundidad": 30,
        "ancho": 50,
        "peso": 40,
        "color": "Marron claro",
        "descripcion": "Un sillon para netflix, pelis, series, todo lo que quieras"
    },
    {
        "id": 4,
        "nombre": "Cama King Size",
        "precio": 100000,
        "altura": 30,
        "profundidad": 100,
        "ancho": 40,
        "peso": 200,
        "color": "Verde fluor",
        "descripcion": "Esta cama es demasiado grande y probablemente no pase por ninguna puerta"
    },
    {
        "id": 5,
        "nombre": "Mesa de centro",
        "precio": 1200,
        "altura": 79,
        "profundidad": 22,
        "ancho": 20,
        "peso": 20,
        "color": "Negro",
        "descripcion": "Mesa de cristal para que se pueda ver lo que hay debajo"
    },
    {
        "id": 6,
        "nombre": "Silla de escritorio",
        "precio": 20000,
        "altura": 35,
        "profundidad": 14,
        "ancho": 32,
        "peso": 304,
        "color": "Fucsia",
        "descripcion": "Silla ergonomica para mayor confort"
    },
    {
        "id": 7,
        "nombre": "Armario de ropero",
        "precio": 200000,
        "altura": 120,
        "profundidad": 20,
        "ancho": 40,
        "peso": 20,
        "color": "Blanco",
        "descripcion": "Armario increiclemente perfecto"
    },
    {
        "id": 8,
        "nombre": "Estanteria",
        "precio": 5000,
        "altura": 70,
        "profundidad": 26,
        "ancho": 33,
        "peso": 19,
        "color": "Gris",
        "descripcion": "Estanteria para todo tipo de usos, pesos, objetos de otros paises"
    },
    {
        "id": 9,
        "nombre": "Cómoda de dormitorio",
        "precio": 200000,
        "altura": 45,
        "profundidad": 20,
        "ancho": 50,
        "peso": 50,
        "color": "Negro",
        "descripcion": "Para colocar el retrato de la abuela, siempre en la comoda"
    },
    {
        "id": 10,
        "nombre": "Silla de jardín",
        "precio": 5000,
        "altura": 30,
        "profundidad": 12,
        "ancho": 38,
        "peso": 29,
        "color": "Rojo",
        "descripcion": "Sillas de plastico para el jardin de tu casa"
    },
    {
        "id": 11,
        "nombre": "Mesa de oficina",
        "precio": 3000,
        "altura": 70,
        "profundidad": 30,
        "ancho": 60,
        "peso": 25,
        "color": "Gris",
        "descripcion": "Ideal para trabajar desde casa"
    },
    {
        "id": 12,
        "nombre": "Sillón reclinable",
        "precio": 15000,
        "altura": 90,
        "profundidad": 80,
        "ancho": 100,
        "peso": 35,
        "color": "Azul",
        "descripcion": "Relájate en este cómodo sillón reclinable"
    },
    {
        "id": 13,
        "nombre": "Mesa de estudio",
        "precio": 2500,
        "altura": 75,
        "profundidad": 40,
        "ancho": 80,
        "peso": 15,
        "color": "Blanco",
        "descripcion": "Perfecta para estudiantes"
    },
    {
        "id": 14,
        "nombre": "Cómoda de madera",
        "precio": 1800,
        "altura": 65,
        "profundidad": 30,
        "ancho": 70,
        "peso": 40,
        "color": "Marrón",
        "descripcion": "Elegante cómoda de madera"
    },
    {
        "id": 15,
        "nombre": "Mesa de conferencia",
        "precio": 8000,
        "altura": 75,
        "profundidad": 150,
        "ancho": 90,
        "peso": 50,
        "color": "Negro",
        "descripcion": "Para reuniones de negocios"
    },
    {
        "id": 16,
        "nombre": "Silla plegable",
        "precio": 1200,
        "altura": 80,
        "profundidad": 20,
        "ancho": 40,
        "peso": 10,
        "color": "Verde",
        "descripcion": "Fácil de transportar y guardar"
    },
    {
        "id": 17,
        "nombre": "Sofá cama",
        "precio": 10000,
        "altura": 70,
        "profundidad": 40,
        "ancho": 80,
        "peso": 30,
        "color": "Gris",
        "descripcion": "Combina comodidad y versatilidad"
    },
    {
      "id": 18,
      "nombre": "Escritorio de vidrio",
      "precio": 3500,
      "altura": 70,
      "profundidad": 40,
      "ancho": 120,
      "peso": 25,
      "color": "Transparente",
      "descripcion": "Un elegante escritorio de vidrio"
  },
  {
      "id": 19,
      "nombre": "Silla de estudio",
      "precio": 1200,
      "altura": 85,
      "profundidad": 45,
      "ancho": 50,
      "peso": 12,
      "color": "Azul",
      "descripcion": "Silla cómoda para largas sesiones de estudio"
  },
  {
      "id": 20,
      "nombre": "Mesa de picnic",
      "precio": 3000,
      "altura": 75,
      "profundidad": 120,
      "ancho": 180,
      "peso": 50,
      "color": "Marrón",
      "descripcion": "Ideal para picnics al aire libre"
  },
  {
      "id": 21,
      "nombre": "Silla de bar",
      "precio": 800,
      "altura": 110,
      "profundidad": 40,
      "ancho": 40,
      "peso": 6,
      "color": "Negro",
      "descripcion": "Para bares y tabernas"
  },
  {
      "id": 22,
      "nombre": "Mesa de dibujo",
      "precio": 2500,
      "altura": 80,
      "profundidad": 90,
      "ancho": 120,
      "peso": 18,
      "color": "Madera",
      "descripcion": "Para artistas y diseñadores"
  },
  {
      "id": 23,
      "nombre": "Silla giratoria",
      "precio": 1500,
      "altura": 95,
      "profundidad": 50,
      "ancho": 50,
      "peso": 10,
      "color": "Negro",
      "descripcion": "Silla cómoda y versátil"
  },
  {
      "id": 24,
      "nombre": "Mesa de billar",
      "precio": 10000,
      "altura": 80,
      "profundidad": 250,
      "ancho": 150,
      "peso": 150,
      "color": "Verde",
      "descripcion": "Para aficionados al billar"
  },
  {
      "id": 25,
      "nombre": "Silla de barbero",
      "precio": 5000,
      "altura": 100,
      "profundidad": 60,
      "ancho": 60,
      "peso": 30,
      "color": "Rojo",
      "descripcion": "Silla clásica de barbería"
  },
  {
      "id": 26,
      "nombre": "Mesa de masaje",
      "precio": 6000,
      "altura": 70,
      "profundidad": 190,
      "ancho": 80,
      "peso": 40,
      "color": "Blanco",
      "descripcion": "Para terapeutas y masajistas"
  },
  {
      "id": 27,
      "nombre": "Sillón de lectura",
      "precio": 3500,
      "altura": 90,
      "profundidad": 80,
      "ancho": 70,
      "peso": 20,
      "color": "Beige",
      "descripcion": "Perfecto para disfrutar de un buen libro"
  }
]

  return (
    <div className="container">
      {muebles.map((m) => {
        return(
        <div  className="card">
         <Card  id={m.id} precio={m.precio} nombre={m.nombre}
        color={m.color} descripcion={m.descripcion} />
        </div>
        )
      })}
    </div>
  );
};

export default CardsContainer;
