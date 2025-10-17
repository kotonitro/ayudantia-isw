import { handleSuccess } from "../Handlers/responseHandlers.js";
import { userRepository } from "../services/user.service.js";
import { userValidation } from "../validations/user.validation.js";
import bcrypt from "bcrypt";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;
  const password = user.password;
  // Para devolver la contraseña (hasheada) buscamos el usuario en la DB
  const userPayload = req.user;
  const userId = userPayload.sub;

  // importamos userRepository dinámicamente para evitar ciclos de import
  import("../services/user.service.js").then(({ userRepository }) => {
    userRepository.findOneBy({ id: userId }).then((userFromDb) => {
      if (!userFromDb) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
        message: `¡Hola, ${userFromDb.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
        userData: userFromDb,
      });
    }).catch((err) => {
      return res.status(500).json({ message: "Error al obtener usuario", error: err.message });
    });
  }).catch((err) => {
    return res.status(500).json({ message: "Error interno", error: err.message });
  });
}


export async function updateProfile(req, res) {
  try {
    const userId = req.user.sub;
    const { email, password } = req.body;

    // Validar solo los campos presentes
    const { error } = userValidation.validate(
      { email, password },
      { presence: "optional" }
    );
    if (error) {
      return res
        .status(400)
        .json({ message: "Datos inválidos", details: error.message });
    }

    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await userRepository.save(user);
    return res
      .status(200)
      .json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar perfil", error: error.message });
  }
}

export async function deleteProfile(req, res) {
  try {
    const userId = req.user.sub;
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await userRepository.remove(user);
    return res.status(200).json({ message: "Perfil eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar perfil", error: error.message });
  }
}