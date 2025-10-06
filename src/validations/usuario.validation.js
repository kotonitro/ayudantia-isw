export const usuarioBodyValidation = Joi.object ({
    nombre: Joi.string()
    .min(2)
    .max(20)
    .required()
    .messages({ "string.pattern.case": "Nombre solo puede contener letras y espacios"}),
    
})