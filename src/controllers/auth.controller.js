const JWTHelper = require("../helpers/jwt");
const { UserModel } = require("../models/user.model");

const bcrypt = require('bcryptjs');

const registerUser = async ( req, res ) => {
    const { email, username, password } = req.body;

    try {

        const dbUser = await UserModel.findOne({ email });
        if( dbUser ) {
            return res.status(400).json({ ok: false, msg: 'El correo ya se encuentra registrados' });
        }

        const newUser = new UserModel( { email, username, password } );

        // ? Encriptar clave
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password, salt );
        console.log(newUser)

        await newUser.save();

        const token = await JWTHelper.generateToken( { id: newUser.id, username: newUser.username } );
        if( !token ) return res.status(500).json({ error: 'Error generating token' });


        return res.status(201).json({
            ok: true,
            msg: 'User successfully created',
            token,
        });

    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Internal server error' });
    }


}

const loginUser = async ( req, res ) => {

    const { username, password } = req.body;


    try {

        const dbUser = await UserModel.findOne({ username });
        if( !dbUser ) return res.status(400).json({ ok: false, msg: 'El usuario no existe' });

        const validPassword = bcrypt.compareSync( password, dbUser.password );
        if( !validPassword ) return res.status(400).json({ ok: false, msg: 'Usuario o contraseña no válido.'});

        const token = await JWTHelper.generateToken( { id: dbUser.id, username: dbUser.username } );
        if( !token ) return res.status(500).json({ error: 'Error generating token' });

        res.status(200).json(
            {
                ok: true,
                uid: dbUser.id,
                name: dbUser.username,
                token
            });

    } catch (error) {
        res.status(500).json({ error });
    }

}

const renewToken = async ( req, res ) => {
    const token = await JWTHelper.generateToken( req.user );

    if( !token ) res.status(500).json({ error: 'Error while generating token.' });

    res.json({
        ok: true,
        token
    })


}


module.exports = {
    registerUser,
    loginUser,
    renewToken,
}
