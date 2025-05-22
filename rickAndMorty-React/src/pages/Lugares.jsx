import { useTransition } from "react";
import { useState, useEffect } from "react";

const Lugares = () => {
    const [lugar, setLugar] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)


    useEffect(() => {
        const url = `https://rickandmortyapi.com/api/location`
        setLoading(true)

        const traerLugares = async () => {
            try {
                
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error(`error ${response.status} - ${response.statusText}`)
                }
                const data = await response.json();
                setLugar(data.results)
            } catch (error) {
                console.log(`error en la ejecucion ${error}`)
            } setLoading(false)
        }


        traerLugares()

    }, [page])

    return (
        <section className="Location">
            <h2 className="Location-title">Lugares</h2>
            <div className="Location-grid">
                {lugar.map((item) => (
                    <article className="Location-gridCard" key={item.id}>
                        <h2>{item.name}</h2>
                        <img src={item.url} alt={item.name} />
                        <p><strong>{item.type}</strong></p>
                        <p><strong>{item.residents.length} habitantes</strong></p>
                    </article>
                ))}
            </div>

        </section>
    );
}

export default Lugares;