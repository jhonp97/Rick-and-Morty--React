// ============================================================================
// TIPOS E INTERFACES
// ============================================================================
// En TypeScript, necesitamos definir la estructura de los datos que esperamos
// recibir de la API. Esto proporciona autocompletado y validación en tiempo de desarrollo.

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  // Hay más propiedades en la respuesta de la API, pero solo incluimos las que usamos
}

interface ApiResponse {
  results: Episode[];
  // La API de Rick and Morty devuelve más datos, pero nos enfocamos en lo necesario
}

interface ErrorType {
  message: string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
import { useState, useEffect } from "react";

const Episodios = () => {
  // ========================================================================
  // ESTADOS - Ahora con tipos explícitos
  // ========================================================================
  // El ": Episode[]" le dice a TypeScript que episodios SIEMPRE será un array de Episode
  const [episodios, setEpisodios] = useState<Episode[]>([]);

  // ": boolean" es el tipo de loading - siempre true o false
  const [loading, setLoading] = useState<boolean>(true);

  // ": ErrorType | null" significa que puede ser un objeto ErrorType O null (inicialmente null)
  const [error, setError] = useState<ErrorType | null>(null);

  // ": number" porque el número de página siempre es un número
  const [page, setPage] = useState<number>(1);

  // ========================================================================
  // EFECTO - Se ejecuta cuando la página cambia
  // ========================================================================
  useEffect(() => {
    // Función asincrónica para traer datos de la API
    // NOTA: No podemos hacer useEffect async directamente, por eso creamos una función dentro
    const traerEpisodios = async (): Promise<void> => {
      // Promise<void> significa: esta función NO retorna nada, solo realiza acciones
      setLoading(true);
      try {
        const apiBase = import.meta.env.VITE_API_URL;
        const url = `${apiBase}/episode?page=${page}`;

        // Fetch con el tipo correcto de respuesta
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`error ${response.status} - ${response.statusText}`);
        }

        // response.json() retorna Promise<unknown>, pero sabemos que es ApiResponse
        // Por eso hacemos "as ApiResponse" (casting/aseveración de tipo)
        const data = (await response.json()) as ApiResponse;
        setEpisodios(data.results);
      } catch (e) {
        // 'e' es de tipo 'unknown' por defecto en TypeScript, necesitamos validarlo
        console.log(`se ha producido un error: ${e}`);
        // Convertimos el error a nuestro tipo ErrorType
        setError(e instanceof Error ? { message: e.message } : { message: "Error desconocido" });
      } finally {
        setLoading(false);
      }
    };

    traerEpisodios();
  }, [page]);

  // ========================================================================
  // SUBCOMPONENTE - Componente que renderiza el listado de episodios
  // ========================================================================
  // Esta función debe retornar JSX.Element (un elemento React)
  function EpisodiosList() {
    return (
      <div className="Card">
        {/* map() requiere que cada hijo en una lista tenga una 'key' única */}
        {episodios.map((item: Episode) => (
          // 'item: Episode' significa que TypeScript sabe que item tiene las propiedades de Episode
          <article className="Card-episodes" key={item.id}>
            <h2>{item.name}</h2>
            <img
              src="https://i0.wp.com/tomatazos.buscafs.com/2025/05/Rick-y-Morty-T8-Poster-2-1-scaled.jpeg?fit=2046,2560&quality=75&strip=all"
              width={300}
              alt={item.name}
            />
            <p>
              <strong>{item.air_date}</strong>
            </p>
            <p>
              <strong>{item.episode}</strong>
            </p>
          </article>
        ))}
      </div>
    );
  }

  // ========================================================================
  // FUNCIONES DE PAGINACIÓN
  // ========================================================================
  // ": void" significa que estas funciones NO retornan nada, solo modifican estado
  const prev = (): void => setPage(page > 1 ? page - 1 : 1);
  const next = (): void => setPage(page + 1);

  // ========================================================================
  // RENDER PRINCIPAL
  // ========================================================================
  // El componente retorna JSX.Element
  return (
    <section className="Episodios">
      <h2>Episodios</h2>
      <div className="Pages">
        <button onClick={prev} disabled={page === 1}>
          {" "}
          Anterior
        </button>
        {page}
        <button onClick={next} disabled={page === 3}>
          siguiente
        </button>
      </div>
      {error && (
        <div>
          Error al cargar Episodios. <br />
          <br /> Error: {error.message}
        </div>
      )}

      {loading ? <div>Cargando Episodios...</div> : <EpisodiosList />}
    </section>
  );
};

export default Episodios;
