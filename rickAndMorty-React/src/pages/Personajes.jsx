import CardPj from "@/components/CardPj";
import { useState, useEffect } from "react";

const Personajes = () => {
    const [page, setPage] = useState(1)
    const [personajes, setPersonajes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState({})


    useEffect(() => {

        const traerPj = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
                if (!response.ok) {
                    throw new Error(`error ${response.status} - ${response.statusText}`)
                }
                const data = await response.json();

                //guardar personajes
                setPersonajes(data.results)

                //guardar info de la pagina
                setInfo(data.info)

                // console.log(data.results)
                // console.log(data.info)
            } catch (error) {
                console.log(`No se pudo cargar el archivo, error: ${error}`)
            }
            setLoading(false)
        }

        traerPj()

    }, [page])
    

     const next = `https://rickandmortyapi.com/api/character?page=${page + 1}`;
     const prev = `https://rickandmortyapi.com/api/character?page=${page - 1}`;

    const cards = personajes.map(p => (
        <CardPj key={p.id} {...p} />
    ))

    return (
        <>
            <h2>Personajes</h2>
            <section className="Card" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>

                {loading ? <p>Cargando...</p> : cards}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                <a href={next}> Anterior</a>
                <a href={prev}> siguiente</a>
            </section>
        </>
    );
}

export default Personajes;