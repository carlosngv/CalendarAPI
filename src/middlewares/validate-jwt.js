const express = require('express');
const JWTHelper = require('../helpers/jwt');

const validateJwt = ( req, res = express.response, next ) => {

    try {

        const token = req.header('x-token');

        if( !token ) return res.status(404).json( { error: 'Token not provided' });

        const validatedToken = JWTHelper.validateToken( token );

        if( !validatedToken ) return res.status(404).json( { error: 'Token is not valid' });

        const { username, id } = validatedToken;

        req.user = { username, id };

        next();
    } catch (error) {
        return res.status(500).json({ error });
    }

}

module.exports = validateJwt;
