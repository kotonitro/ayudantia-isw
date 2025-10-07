import { handleSuccess, handleErrorClient } from "../Handlers/responseHandlers.js";
import { userValidation } from "../validations/user.validation.js"

export async function updateUser(req, res) {
  try {
    const changes = req.body;
    const id = req.user.sub;

    if (!changes || Object.keys(changes).length === 0) {
      return handleErrorClient(
        res,
        400,
        "Datos para actualizar son requeridos"
      );
    }

    // Validar solo los campos presentes
    const { error } = userValidation.validate(changes, {
      presence: "optional",
    });
    if (error) {
      return handleErrorClient(res, 400, "Datos inválidos", error.message);
    }

    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }

    if (changes.email) user.email = changes.email;
    if (changes.password) {
      const bcrypt = await import("bcrypt");
      user.password = await bcrypt.default.hash(changes.password, 10);
    }
    await userRepository.save(user);
    handleSuccess(res, 200, "Perfil actualizado exitosamente", {
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    handleErrorClient(res, 500, error.message);
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.user.sub;
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }
    await userRepository.remove(user);
    handleSuccess(res, 200, "Usuario eliminado exitosamente", { id });
  } catch (error) {
    handleErrorClient(res, 500, error.message);
  }
}