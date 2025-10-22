"use strict";
import Joi from "joi";

  export const userUpdateValidation = Joi.object({
    email: Joi.string().email().optional().messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.email": "El correo electrónico debe tener un formato válido.",
    }),
    password: Joi.string()
      .min(6)
      .max(100)
      .pattern(/^[\S]{6,100}$/)
      .optional()
      .messages({
        "string.empty": "La contraseña no puede estar vacía.",
        "string.base": "La contraseña puede contener cualquier símbolo.",
        "string.min": "La contraseña debe tener al menos {6} caracteres.",
        "string.max": "La contraseña no puede exceder los {100} caracteres.",
        "string.pattern.base": "La contraseña puede contener cualquier símbolo.",
      }),
  })
    .unknown(false)
    .messages({
      "object.unknown": "No se permiten campos adicionales.",
    });

  export const userCreateValidation = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.email": "El correo electrónico debe tener un formato válido.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
    password: Joi.string()
      .min(6)
      .max(100)
      .pattern(/^[\S]{6,100}$/)
      .required()
      .messages({
        "string.empty": "La contraseña no puede estar vacía.",
        "any.required": "La contraseña es obligatoria.",
        "string.base": "La contraseña puede contener cualquier símbolo.",
        "string.min": "La contraseña debe tener al menos {6} caracteres.",
        "string.max": "La contraseña no puede exceder los {100} caracteres.",
        "string.pattern.base": "La contraseña puede contener cualquier símbolo.",
      }),
  })
    .unknown(false)
    .messages({
      "object.unknown": "No se permiten campos adicionales.",
  });

  export const loginValidation = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "El correo electrónico no puede estar vacío.",
      "string.email": "El correo electrónico debe tener un formato válido.",
      "any.required": "El correo electrónico es obligatorio.",
    }),
    password: Joi.string().min(6).max(100).required().messages({
      "string.empty": "La contraseña no puede estar vacía.",
      "any.required": "La contraseña es obligatoria.",
      "string.base": "La contraseña puede contener cualquier símbolo.",
      "string.min": "La contraseña debe tener al menos {6} caracteres.",
      "string.max": "La contraseña no puede exceder los {100} caracteres.",
      "string.pattern.base": "La contraseña puede contener cualquier símbolo.",
    }),
  })
    .unknown(false)
    .messages({
      "object.unknown": "No se permiten campos adicionales.",
    });
