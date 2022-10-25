const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getInfo, crearInfo, actualizarInfo, eliminarInfo } = require('../controllers/info');

const router = Router();


//Todas necesitan validar token
router.use( validarJWT );


//Obtener info
router.get( '/', getInfo );

//Crear un nueva info
router.post( 
    '/', 
    [
            check('Postura', 'La postura es obligatoria').not().isEmpty(),
            check('Semana', 'La semana es obligatoria').not().isEmpty(),
            check('Fecha', 'La fecha del gasto es obligatoria').not().isEmpty(),
            check('Gasto', 'La categoría del gasto es obligatoria').not().isEmpty(),
            check('Tabla', 'La tabla es obligatoria').not().isEmpty(),
            check('Cantidad', 'La cantidad es obligatoria').not().isEmpty(),
            validarCampos

    ],
    
    crearInfo );

//Actualizar info
router.put( '/:id',  actualizarInfo );

//Borrar info
router.delete('/:id',  eliminarInfo)

module.exports = router;