
var jwt = require('jsonwebtoken');

class JWTHelper {

    static generateToken = ( payload ) => {
        return new Promise( ( resolve, reject ) => {
            jwt.sign( payload, process.env.JWT_PRIVATE_KEY, ( error, token ) => {
                if( error ) reject( null );

                resolve( token );

            });
        } );
    }

    static validateToken = ( token ) => {
        return jwt.verify( token, process.env.JWT_PRIVATE_KEY, ( error, decoded ) => {
            if( error ) return false;
            return decoded;
        });
    }
}


module.exports = JWTHelper;
