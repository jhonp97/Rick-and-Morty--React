const BASE_URL = process.env.API_BASE_URL

export const getRickAndMortyPersonajes = async (req, res, next) => {
  try {
     const params = new URLSearchParams(req.query);
    
    const apiURL = `${BASE_URL}/character?${params.toString()}`;
    const response = await fetch(apiURL);

    if (!response.ok) {
      // Si la respuesta no es exitosa, se lanza un error
      throw new Error(`Error ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Retornamos la data obtenida en formato JSON al cliente
    res.status(200).json(data);
  } catch (error) {
    // Si ocurre algún error, lo pasamos al siguiente middleware de manejo de errores
    next(error);
  }
};
