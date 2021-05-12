const path = require('path');
const express = require('express');
const cors = require('cors');

const environment = process.env.NODE_ENV || "dev";
const app = express();
const port = process.env.PORT || 3000;

if (environment === 'production') {
    app.use('*', (req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        return next();
    });
}

app.use(cors());
app.use(express.static(path.resolve(__dirname, "./app")));

app.use('/api/fetchTheme', (req, res) => {
    res.send({
        theme: {
            colors: {
                primaryBackground: "#f5a623",
                primaryText: "#ffffff"
            }
        },
        title: `Check-in`
    });
});

app.use('/api/fetchReservation', (req, res) => {
    res.send({
        guest: {
            firstName: "Erik",
            lastName: "de Vries"
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./app"));
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
