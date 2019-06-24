const superagent = require("superagent");

const BASE_API_POKEMON = "https://pokeapi.co/api/v2/";

module.exports.getPokemonResponse = async (type) => {
    const pokeapiResponse = await superagent.get(BASE_API_POKEMON + "type/" + type)
        const {
            body
        } = pokeapiResponse;
        const {
            pokemon
        } = body;
        const pokemons = [];
        const nums = []
        return pokemons
}