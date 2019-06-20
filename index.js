const express = require("express");
const serverExpress = express();

require('./src/routes')(serverExpress);

const port = process.env.PORT || 5000;

serverExpress.use(express.static(__dirname + '/public'));

serverExpress.listen(port, () => {
    console.log("startado na porta: " + port);
});
