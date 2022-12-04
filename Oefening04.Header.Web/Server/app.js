const express = require('express');
const app = express();
const port = 3000;

// Meer info: zie ook de NodeJS slides.

// Deze (zelf gemaakte) middleware zal een Cache-control header toevoegen aan alle GET responses.
let setCache = function (req, res, next) {
    const period = 15;

    // Voor GET requests wordt een cache gezet.
    // Andere requests (zoals POST, PUT, DELETE) mogen nooit gecached worden.
    if (req.method === 'GET') {
        res.set('Cache-control', `public, max-age=${period}`);
    } else {
        res.set('Cache-control', 'no-store');
    }

    // Aangezien er meerdere middlewares geregistreerd kunnen zijn moeten we de volgende middelware in de pipeline
    // de kans geven om ook werk te verrichten.
    next();
}

// Eerst wordt onze middleware geregistreerd.
app.use(setCache);

// En vervolgens de middleware die ervoor zorgt dat bestanden in ../Public/Client aangeboden worden.
// (!) Het is dus belangrijk dat onze middleware 'next()' aanroept anders zal deze middleware niet werken.
app.use(express.static('../Client/Public'));

app.listen(port, () => {
    console.log(`NodeJS-Express listening at http://localhost:${port}`)
});