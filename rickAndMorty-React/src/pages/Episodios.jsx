import CardPj from "@/components/CardPj";
import { useState, useEffect } from "react";

const Episodios = () => {
    const [page, setPage]= useState(1)
    const [loading, setLoading]= useState(true)
    const [Episodios, setEpisodios] = useState([])

    const traerEpisodios=async()=>{
        try{

        }catch(e){
            console.log(`se ha producido un error: ${e}`)
        }

    }

    return ( 
        <div className="Episodios">
            <h2>Episodios</h2>
        </div>
     );
}
 
export default Episodios;