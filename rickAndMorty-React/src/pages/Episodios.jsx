import CardPj from "@/components/CardPj";
import { useState, useEffect } from "react";

const Episodios = () => {
    const [page, setPage]= useState(1)
    const [loading, setLoading]= useState(true)
    const [Episodios, setEpisodios] = useState([])

    return ( 
        <div className="Episodios">
            <h2>Episodios</h2>
        </div>
     );
}
 
export default Episodios;