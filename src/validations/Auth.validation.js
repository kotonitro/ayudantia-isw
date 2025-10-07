"use strict";
import Joi from "joi";

export const usuarioValidation = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "string.email": "El correo electrónico debe tener un formato válido.",
            "any.required": "El correo electrónico es obligatorio.",
        }),
    password: Joi.string()
        .min(6)
        .max(100)
        .pattern(/^[a-zA-Z0-9]+$/)
        .required()
        .messages({
            "string.empty": "La contraseña no puede estar vacía.",
            "any.required": "La contraseña es obligatoria.",
            "string.base": "La contraseña solo puede contener letras y números.",
            "string.min": "La contraseña debe tener al menos {6} caracteres.",
            "string.max": "La contraseña no puede exceder los {100} caracteres.",
            "string.pattern.base": "La contraseña solo puede contener letras y números.",
        })
}).unknown(false).messages({
    "object.unknown": "No se permiten campos adicionales."
});