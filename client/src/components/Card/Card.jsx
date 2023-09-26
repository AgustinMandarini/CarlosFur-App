const Card = (props) =>{
  
    return (
        <div className="card-container" key={props.id}>
            <h1>nombre: {props.nombre}</h1>
            <p>tipo de maderas: {props.tipo_madera}</p>
        </div>
    ) 
    }
    
    export default Card