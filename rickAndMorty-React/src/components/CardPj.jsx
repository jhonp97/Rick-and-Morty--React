const CardPj = ({ name, image, species, status, gender }) => {
const styles={
 border: "solid 2px gray", 
 borderRadius: "8px",
 boxShadow: "0 0 15px gray"
}

    return (


        <div className="Card-personaje" style={styles}>
            <h2>{name}</h2>
            <img src={image} alt={name} loading="lazy" />

            <p>
                <strong>Género:</strong>
                <strong >
                    {gender === "Female" ? "♀️" : gender === "Male" ? "♂️" : gender === "unknown"? "❓❓❓": " ❌❌❌"}
                </strong>
            </p>

            <p>
                <strong>Especie:</strong> <strong>{species === "Alien" ? "👽": species}</strong>
            </p>

            <p>
                <strong>Estado:</strong> <strong style={status === "Dead" ? { color: "red" } : {}}>{status}</strong>
            </p>
        </div>


    );
}

export default CardPj;