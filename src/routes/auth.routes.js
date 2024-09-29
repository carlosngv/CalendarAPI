
const express = require('express');
const { check } = require('express-validator');

const { registerUser, renewToken, loginUser } = require('../controllers/auth.controller');

const { validateFields } = require('../middlewares/field-validators');
const validateJwt = require('../middlewares/validate-jwt');

const router = express.Router();


router.post('/login', [
    check('password', 'password es obligatorio').not().isEmpty(),
    check('username', 'Username es obligatorio').not().isEmpty(),
    validateFields
], loginUser );

router.post('/register', [
    check('username', 'Username es obligatorio').not().isEmpty(),
    check('password', 'password debe de ser de por lo menos 6 caracteres').isLength({ min: 6 }),
    check('email', 'email debe de ser válido').isEmail(),
    validateFields

], registerUser );

router.get('/renew', validateJwt, renewToken );


module.exports = router;
