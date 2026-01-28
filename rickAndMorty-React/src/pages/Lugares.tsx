
import { useState, useEffect } from "react";


interface Lugar {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
}

interface LugarApiResponse {
    results: Lugar[];
}


const Lugares = () => {
    const [lugar, setLugar] = useState<Lugar[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    const [page, setPage] = useState<number>(1)


    useEffect(() => {
        // const url = `https://rickandmortyapi.com/api/location?page=${page}`


        const controller = new AbortController()

        const traerLugares = async (): Promise<void> => {
            setLoading(true)
            setError(null)
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/location?page=${page}`;
                const option = controller.signal

                const response = await fetch(url, { signal: option });
                if (!response.ok) {
                    throw new Error(`error ${response.status} - ${response.statusText}`)
                }
                const data = (await response.json()) as LugarApiResponse;
                setLugar(data.results)
            } catch (erro) {
                if (erro instanceof Error && erro.name === 'AbortError') {
                    return;
                }
                console.error('Error al cargar lugares:', erro)
                setError(erro instanceof Error ? erro : new Error("Error desconocido"))
            } finally {
                setLoading(false)
            }
        }
        traerLugares()
        return () => controller.abort()

    }, [page])


    function Ubicaciones() {
        return (
            <div className="Card">
                {lugar.map((item: Lugar) => (
                    <article className="Card-location" key={item.id}>
                        <h2>{item.name}</h2>
                        <img src="https://i.ytimg.com/vi/QbNbCmoSW50/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBsfojVHQdcJSxAx3Cre7_ZoTY77A" width={300} alt={item.name} />
                        <p><strong>{item.type}</strong></p>
                        <p><strong>{item.dimension}</strong></p>
                        <p><strong>{item.residents.length} habitantes</strong></p>
                    </article>
                ))}
            </div>
        )
    }

    const prev = () => setPage(page > 1 ? page - 1 : 1);
    const next = () => setPage(page + 1);
    return (
        <section className="Location">
            <h2 className="Location-title">Lugares</h2>

            <div className="Pages">
                <button onClick={prev} disabled={page === 1}> Anterior</button>
                {page}
                <button onClick={next}>siguiente</button>
            </div>
            {error && (
                <div>
                    Error al cargar Ubicaciones. <br />
                    <br /> Error: {error.message}
                </div>
            )}

            {loading ? <div>Cargando Ubicaciones...</div> : <Ubicaciones />}



        </section>
    );
}

export default Lugares;