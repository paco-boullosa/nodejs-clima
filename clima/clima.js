const axios = require('axios');

const getClima = async(lat, lon) => {

    const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?APPID=76f23b6db9e302402ab2d1ffd8895f44&units=metric&lat=${lat}&lon=${lon}`
    })

    const resp = await instance.get();

    return resp.data.main.temp;
}


module.exports = {
    getClima
};