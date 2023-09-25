const { Router} =require("express");
const {check} = require("express-validator");
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch 
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, emailExiste, existeUsuarioPorID } = require("../helpers/db_validators");

const router = Router();

router.get('/', usuariosGet);

router.post('/',[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({min:6}),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRolValido),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    check("rol").custom(esRolValido),
    validarCampos
], usuariosPut);

router.patch("/", usuariosPatch)

router.delete('/:id',[
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete);

module.exports =router;