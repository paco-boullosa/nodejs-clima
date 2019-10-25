const axios = require('axios');

const getLatLon = async(direccion) => {
    const encodedDireccion = encodeURI(direccion);

    //necesitamos acceder a la API con los credenciales => en headers
    const instance = axios.create({
        baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=' + encodedDireccion,
        timeout: 8000,
        headers: {
            "X-RapidAPI-Key": "6a18bd565fmshea3e3abee54401cp17ebfbjsn23bc1909e6df"
        }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }

    const data = resp.data.Results[0];
    const dir = data.name;
    const lat = data.lat;
    const lng = data.lon;

    return {
        dir,
        lat,
        lng
    }
    /*  //si no se hiciese con await sería algo así
        instance.get()
            .then(resp => {
                console.log(resp.data.Results[0]);
            })
            .catch(err => {
                console.log('Error: ', err);
            })
    */
}

module.exports = {
    getLatLon
}