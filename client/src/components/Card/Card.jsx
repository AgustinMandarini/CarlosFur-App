
const Card = (props) =>{
  
    return (
        <div className="card-container" key={props.id}>
            <h1>{props.nombre}</h1>
            <p>${props.precio}</p>
            <p>Descripcion: {props.descripcion}</p>
            <p>Color: {props.color} </p>
        </div>
    ) 
    }
    
    export default Card