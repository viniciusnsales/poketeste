const superagent = require("superagent");

const BASE_API_OPENWEATHER = "https://api.openweathermap.org/data/2.5/weather";
const APPID = "ae8ea9f96d42b75c0f625a8695156636";
const BASE_API_POKEMON = "https://pokeapi.co/api/v2/";

module.exports.getPokemonType = (temp, isRain) => {

    if (isRain) {
        return "electric"
    } else {
        if (temp < 5) {
            return "ice";
        } else if (temp >= 5 && temp < 10) {
            return "water";
        } else if (temp >= 12 && temp <= 15) {
            return "grass";
        } else if (temp > 15 && temp <= 21) {
            return "ground";
        } else if (temp >= 23 && temp <= 27) {
            return "bug";
        } else if (temp > 27 && temp <= 33) {
            return "rock";
        } else if (temp > 33) {
            return "fire";
        } else {
            return "normal";
        }
    }
}

module.exports.pokeapiResponse = async (type) => {
    try {
        const pokeapiResponse = await superagent.get(BASE_API_POKEMON + "type/" + type)
        const {
            body
        } = pokeapiResponse;
        const {
            pokemon
        } = body;
        const pokemons = [];
        const nums = [];
        for (let i = 0; i < 4; i++) {

            num = Math.floor(Math.random() * (pokemon.length / 2 - 1));

            while (nums.includes(num)) {
                num = Math.floor(Math.random() * (pokemon.length / 2 - 1));
            }

            nums[i] = num;

            const p = pokemon[num].pokemon;
            const url = p.url;
            const response = await superagent.get(url);
            const sprites = response.body.sprites;
            const img = sprites.front_default;
            pokemons.push({
                name: p.name,
                img
            });
        }
        return pokemons;
    } catch (error) {
        console.error(error);
        return 500;
    }

}

module.exports.weatherResponse = async (cidade) => {
    const weatherResponse = await superagent.get(BASE_API_OPENWEATHER)
        .query({
            q: cidade
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
        .then(res => {
            return res
        })
        .catch((error) => {
            console.log(error.status);
            return error
        })
    const status = weatherResponse.status;
    if (status == 200) {
        const {
            body
        } = weatherResponse;
        const {
            main,
            weather
        } = body;
        const isRain = weather[0].main === "Rain";
        const climate = weather[0].description;
        const temp = main.temp;
        return {
            isRain,
            climate,
            temp,
            status
        }
    } else {
        return { status };
    }

}