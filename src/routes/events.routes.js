const { Router } = require('express');
const { check } = require('express-validator');


const { getEvents, deleteEvent, createEvent, updateEvent } = require('../controllers/events.controller');
const validateJwt = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/field-validators');
const { checkDate } = require('../helpers/isDate');

const router = Router();

router.get( '/', validateJwt, getEvents );

router.post( '/', [
    check('title', 'Titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha inicial es obligatoria').custom( checkDate ),
    check('end', 'Fecha final es obligatoria').custom( checkDate ),
    validateFields,
    validateJwt
], createEvent );

router.put( '/:id', [
    check('start', 'Fecha inicial es obligatoria').custom( checkDate ),
    check('end', 'Fecha final es obligatoria').custom( checkDate ),
    validateFields,
    validateJwt,
], updateEvent );

router.delete( '/:id', validateJwt, deleteEvent );

module.exports = router;
