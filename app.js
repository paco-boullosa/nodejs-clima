const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Ciudad de la que se quiere obtener el tiempo',
        demand: true
    }
}).argv;

const geolocalizacion = require('./geolocalizacion/geolocalizacion');

const clima = require('./clima/clima');

const getInfo = async(direccion) => {
    try {
        const coordenadas = await geolocalizacion.getLatLon(direccion);
        const temperatura = await clima.getClima(coordenadas.lat, coordenadas.lng);
        return `La temperatuda de ${coordenadas.dir} es de ${temperatura}`;
    } catch (e) {
        return `No se pudo determinar el clima de ${direccion}`;
    }
}

getInfo(argv.direccion)
    .then(resp => { console.log(resp); })
    .catch(err => { console.log(err); });