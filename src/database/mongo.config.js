const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.DB_URL, {
            dbName: process.env.DB_NAME,
        } );

        console.log('Mongo connected')

    } catch (error) {
        console.log( error )
    }

}


module.exports = {
    dbConnection,
}
