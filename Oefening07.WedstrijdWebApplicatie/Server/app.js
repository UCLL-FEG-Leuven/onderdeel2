const express = require('express');
const app = express();
const port = 3000;

// Deze middleware zorgt ervoor dat express pagina's in de folder /wwwroot zal aanbieden.
app.use(express.static('../Client/Public'));

app.listen(port, () => {
    console.log(`NodeJS-Express listening at http://localhost:${port}`)
});