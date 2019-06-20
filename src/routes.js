const model = require('./controller');

module.exports = function (serverExpress) {

    serverExpress.get('/', (req, res) => {
        res.sendfile(__dirname + '/view/index.html')
    });

    serverExpress.get('/pokemons/', async (req, res) => {
        res.json({
            "cod": "404"
        })
    });

    serverExpress.get('/pokemons/:cidade', async (req, res) => {
        //destruct
        const {
            params
        } = req;
        const weather = await model.weatherResponse(params.cidade);

        const status = weather.status;

        if (status == 200) {
            const temp = weather.temp;
            const isRain = weather.isRain;
            const climate = weather.climate;
            const type = model.getPokemonType(temp, isRain);

            const pokemons = await model.pokeapiResponse(type);
            res.json({
                "cod": status,
                isRain,
                climate,
                temp,
                type,
                pokemons,

            });
        } else {
            res.json({
                "cod": status
            })
        }

    });
}