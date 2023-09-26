import Card from "../Card/Card"

const CardsContainer =() =>{
    const muebles = [
        {
            "id": 1,
          "nombre": "Mesa de comedor",
          "altura": "75 cm",
          "peso": "20 kg",
          "tipo_madera": "Roble"
        },
        {
            "id" : 2,
          "nombre": "Silla de cocina",
          "altura": "85 cm",
          "peso": "5 kg",
          "tipo_madera": "Pino"
        },
        ]

    return(
        <div>
        {muebles.map(mueble=>{
            return <Card
            id={mueble.id}
            nombre={mueble.nombre}
            tipo={mueble.tipo_madera}
       />})}
        </div>
    )
}


export default CardsContainer