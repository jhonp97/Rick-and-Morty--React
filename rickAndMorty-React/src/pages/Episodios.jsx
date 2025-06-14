
import { useState, useEffect } from "react";

const Episodios = () => {
    const [episodios, setEpisodios] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [page, setPage] = useState(1)

    useEffect(() => {

        const traerEpisodios = async () => {
            setLoading(true)
            try {
                const apiBase = import.meta.env.VITE_API_URL;
                const url = `${apiBase}/episode?page=${page}`;
                const controller = new AbortController();
                const option = controller.signal

                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`error ${response.status} - ${response.statusText}`)
                }
                const data = await response.json();
                setEpisodios(data.results)
            } catch (e) {
                console.log(`se ha producido un error: ${e}`)
                setError(e)
            } finally{
                setLoading(false)
            }

        }

        traerEpisodios()
    }, [page]);

    function Episodios() {
        return (
            <div className="Card">
                {episodios.map((item) => (
                    <article className="Card-location" key={item.id}>
                        <h2>{item.name}</h2>
                        <img src="https://i0.wp.com/tomatazos.buscafs.com/2025/05/Rick-y-Morty-T8-Poster-2-1-scaled.jpeg?fit=2046,2560&quality=75&strip=all" width={300} alt={item.name} />
                        
                    </article>
                ))}
            </div>
        )
    }

    const prev = () => setPage(page > 1 ? page - 1 : 1);
    const next = () => setPage(page + 1);

    return (
        <section className="Episodios">
            <h2>Episodios</h2>
            <div className="Pages">
                <button onClick={prev} disabled={page === 1}> Anterior</button>
                {page}
                <button onClick={next}>siguiente</button>
            </div>
            {error && (
                <div>
                    Error al cargar Episodios. <br />
                    <br /> Error: {error.message}
                </div>
            )}

            {loading ? <div>Cargando Episodios...</div> : <Episodios />}
        </section>
    );
}


export default Episodios;