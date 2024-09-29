require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/mongo.config');


const app = express();

// ? DB

dbConnection();

app.use( express.json() );

// ? Cors
app.use( cors() );


// ? Definir directorio público
app.use( express.static('public') );

app.use( '/api/auth', require('./routes/auth.routes') );
app.use( '/api/events', require('./routes/events.routes') );


// app.get('/*', (res, req) => {
//     res.
// })

app.listen( process.env.PORT, () => {
    console.log('Listening...')
});
