const BASE_URL = process.env.API_BASE_URL

export  const rickandmortyLugares = async (req, res, next)=>{
    try{
      const {page }= req.query
         const apiURL = `${BASE_URL}/location?page=${page}`;
    const response = await fetch(apiURL);

    if (!response.ok) {
      // Si la respuesta no es exitosa, se lanza un error
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Retornamos la data obtenida en formato JSON al cliente
    res.status(200).json(data);
    }catch (err){
        next(err)
    }

}