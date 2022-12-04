const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const port = 3000;

// Meer info: zie ook de NodeJS slides.

// Deze (zelf gemaakte) middleware zal een tracker cookie toevoegen indien deze nog niet bestaat.
// Indien deze wel bestaat wordt de cookie gelogd op de console (van de server).
// Als cookie worden UUID's gebruikt: dat zijn gegarandeerd 99,999999999...% unieke ID's :)
let trackerCookie = function (req, res, next) {

    if (!req.cookies.tracker) {
        // Geen cookie gevonden? Met de uuid library wordt er een nieuwe UUID gemaakt.
        let uuid = uuidv4();
        console.log(`Geen 'tracker' cookie gevonden. Er wordt nu eentje toegevoegd: ${uuid}`)

        res.cookie('tracker', uuid);
    } else {
        // Wel een cookie gevonden? Loggen op de console...
        console.log(`'tracker' cookie gevonden: ${req.cookies.tracker}`)
    }

    // Aangezien er meerdere middlewares geregistreerd kunnen zijn moeten we de volgende middelware in de pipeline
    // de kans geven om ook werk te verrichten.
    next();
}

// Eerst wordt de cookie-parser middleware geregistreerd.
// Wij moeten na deze middleware komen omdat we er gebruik willen van maken.
app.use(cookieParser());

// Dan wordt onze middleware geregistreerd.
app.use(trackerCookie);

// En vervolgens de middleware die ervoor zorgt dat bestanden in ../Public/Client aangeboden worden.
// (!) Het is dus belangrijk dat onze middleware 'next()' aanroept anders zal deze middleware niet werken.
app.use(express.static('../Client/Public'));

app.listen(port, () => {
    console.log(`NodeJS-Express listening at http://localhost:${port}`)
});