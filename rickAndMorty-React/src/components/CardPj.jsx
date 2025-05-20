const CardPj = ({ name, image, species, status}) => {
    return ( 
    
         
                <div className="Card-personaje" style={{ border: "solid 2px gray", borderRadius: "8px"}}>
                    <h2>{name}</h2>
                    <img src={image} alt={name} loading="lazy"/>
                    <p><strong>Especie: {species}</strong></p>
                    <p><strong>Estado: {status}</strong></p>
                </div>
              
                
     );
}
 
export default CardPj;