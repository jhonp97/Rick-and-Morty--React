import Personajes from "@/pages/Personajes";
import Episodios from '@/pages/Episodios'
import Lugares from '@/pages/Lugares'
import { useState } from "react";

const Nav = () => {
    const [page, setPage] = useState("characters")
    return (
    <>
        <header className="Header">
            <nav className="Nav">
                <button onClick={() => setPage("characters")}>Personajes</button>
                <button onClick={() => setPage("locations")}>Lugares</button>
                <button onClick={() => setPage("episodes")}>Episodios</button>
            </nav>

        </header>
            {page == "characters" && <Personajes />}
            {page == "locations" && <Lugares />}
            {page == "episodes" && <Episodios />}
    </>

    );
}

export default Nav;