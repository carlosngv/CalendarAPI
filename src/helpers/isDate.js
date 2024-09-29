const moment = require('moment');


// ? Los argumentos son con base a la documentación de express-validator
const checkDate = ( value, { req, location, path } ) => {
    if( !value ) return false;

    const momentDate = moment( value );

    if( momentDate.isValid() ) return true;
    return false;

}

module.exports = {
    checkDate
}
