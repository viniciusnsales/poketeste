const superagent = require("superagent");

const BASE_API_OPENWEATHER = "https://api.openweathermap.org/data/2.5/weather";
const APPID = "ae8ea9f96d42b75c0f625a8695156636";

module.exports.weatherByCity = async (city) => {
    const weatherResponse = await superagent.get(BASE_API_OPENWEATHER)
        .query({
            q: city
        })
        .query({
            APPID
        })
        .query({
            units: "metric"
        })
        .query({
            lang: "pt"
        })
        .then( res =>{
            return res
        })
        .catch((error) => {
            return error
        })
        return {
            isRain,
            climate,
            temp,
            status
        }
}