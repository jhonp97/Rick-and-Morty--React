import CardPj from "@/components/CardPj";
import { useState, useEffect } from "react";

const Personajes = () => {
    const [page, setPage] = useState(1)
    const [personajes, setPersonajes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState({})
    // const [filtro, setFiltro] = useState("all")
    // otra forma de hacerlo
    const [filtro, setFiltro] = useState({
        status: "",
        species: "",
        type: "",
        name: "",
        gender: ""
    })


    useEffect(() => {

        const traerPj = async () => {
            try {
                setLoading(true)
                setError(null)

                // VERSION 1 crear string a partir de un objeto
                // const crearSearchParams=(filtro)=>{
                //     const listaAtributos = Object.keys(filtro)
                //     let string="";

                //     listaAtributos.map((key)=>{
                //         if(filtro[key] !== ""){
                //             string+=`&${key}=${filtro[key]}`
                //         }
                //     });
                //     return string;
                // }
                // const filtrosUrl= crearSearchParams();
                // console.log(filtrosUrl)
                //realizamos la pticion con fetch
                // const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&${filtrosUrl}`)


                // CREAR OBJETO CON URLsearchParams
                //VERSION 2
                const params = new URLSearchParams();
                params.append("page", page)

                //añadir solo los filtros que tengan valor
                Object.entries(filtro).forEach(([key, value]) => {
                    if (value !== "") {
                        params.append(key, value);
                    }
                });

                // const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}${filtro !== "all" ? `&species=${filtro}` : ""}`);
                // const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&species=${filtro.species}&status=${filtro.status}&gender=${filtro.gender}`);
                const response = await fetch(`https://rickandmortyapi.com/api/character?${params.toString()}`)


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

    }, [page, filtro])


    const next = () => {
        setPage(prev => prev + 1);
    }

    const prev = () => {
        const ant = page <= 1 ? null : page - 1;
        setPage(ant)
    };

    const cards = personajes.map(p => (
        <CardPj key={p.id} {...p} />
    ))

    console.log(info.count)

    return (
        <main className="Personajes">
            <h2 className="Personaje-title">Personajes</h2>

            <div className="Search">
                <input
                    className="Search-label"
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={filtro.name}
                    onChange={(e) => setFiltro({ ...filtro, name: e.target.value })}
                />

                <label className="Search-label">Filtrar por especie:
                    <select
                        id="filtro"
                        onChange={(e) => {
                            setFiltro({ ...filtro, species: e.target.value });
                            setPage(1);
                        }}
                        value={filtro.species}
                    >
                        <option value="">Todos</option>
                        <option value="Human">Humanos</option>
                        <option value="Alien">Alien</option>
                    </select>
                </label>


                <label className="Search-label">Filtrar por estado:
                    <select
                        id="filtro"
                        onChange={(e) => {
                            setFiltro({ ...filtro, status: e.target.value });
                            setPage(1);
                        }}
                        value={filtro.status}
                    >
                        <option value="">Todos</option>
                        <option value="alive">Vivo</option>
                        <option value="dead">Muerto</option>
                        <option value="unknown">Desconocido</option>
                    </select>
                </label>

                <label className="Search-label">Filtrar por Genero:
                    <select
                        id="filtro"
                        onChange={(e) => {
                            setFiltro({ ...filtro, gender: e.target.value });
                            setPage(1);
                        }}
                        value={filtro.gender}
                    >
                        <option value="">Todos</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="genderless">Sin genero</option>
                        <option value="unknown">Desconocido</option>
                    </select>
                </label>

            </div>

             <div className="Pages">
                             
            <button onClick={prev}> Anterior</button>
            {page} 
            <button onClick={next}>siguiente</button>
            </div> 

            <section className="Card" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>

                {loading ? <p>Cargando...</p> : cards}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}


            </section>
        </main>
    );
}

export default Personajes;