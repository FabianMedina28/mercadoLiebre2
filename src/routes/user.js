const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { registro, register } = require('../controllers/userController');

const validateRegister = [
    check('nombre')
        .notEmpty().withMessage('campo obligatorio').bail()
        .isLength({ min: 3 }).withMessage('Su nombre debe contar al menos con 3 caracteres'),
    check("apellido")
        .notEmpty().withMessage('campo obligatorio').bail()
        .isLength({ min: 4 }).withMessage('Su apellido tener mas de 4 caracteres'),
        check("email")
        .notEmpty().withMessage("ingresar su email").bail()
        .isEmail().withMessage("El mail ingresado no es válido"),
    check("password")
        .notEmpty().withMessage("ingrese su contraseña").bail()
        .isLength({ min: 8 }).withMessage("La contraseña debe tener 8 caracteres")
];


router.get('/registro', registro);


router.post('/registro', validateRegister, register);

module.exports = router;