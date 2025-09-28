/*
import {
  findNotas,
  findNotaById,
  createNota,
  updateNota,
  deleteNota,
} from "../services/notas.services.js";
*/
import {
  handleSuccess, handleErrorClient } from "../Handlers/responseHandlers.js";
/*
export class NotasController {
  async getAllNotas(req, res) {
    try {
      const notas = await findNotas();
      handleSuccess(res, 200, "Notas obtenidas exitosamente", notas);
    } catch (error) {
      handleErrorServer(res, 500, "Error al obtener las notas", error.message);
    }
  }

  async getNotaById(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      const nota = await findNotaById(id);
      handleSuccess(res, 200, "Nota obtenida exitosamente", nota);
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }

  async createNota(req, res) {
    try {
      const data = req.body;
      
      if (!data || Object.keys(data).length === 0) {
        return handleErrorClient(res, 400, "Datos de la nota son requeridos");
      }
      
      const nuevaNota = await createNota(data);
      handleSuccess(res, 201, "Nota creada exitosamente", nuevaNota);
    } catch (error) {
      handleErrorServer(res, 500, "Error al crear la nota", error.message);
    }
  }

  async updateNota(req, res) {
    try {
      const { id } = req.params;
      const changes = req.body;
      
      if (!id || isNaN(id)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      if (!changes || Object.keys(changes).length === 0) {
        return handleErrorClient(res, 400, "Datos para actualizar son requeridos");
      }
      
      const notaActualizada = await updateNota(id, changes);
      handleSuccess(res, 200, "Nota actualizada exitosamente", notaActualizada);
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }

  async deleteNota(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return handleErrorClient(res, 400, "ID de nota inválido");
      }
      
      await deleteNota(id);
      handleSuccess(res, 200, "Nota eliminada exitosamente", { id });
    } catch (error) {
      handleErrorClient(res, 404, error.message);
    }
  }
}
*/
export async function updateUser(req, res) {
  try {
    const changes = req.body;
    const id = req.user.sub;
    if (!changes || Object.keys(changes).length === 0) {
      return handleErrorClient(
        res, 400, "Datos para actualizar son requeridos"
      );
    }
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }
    // Solo permitir actualizar email y password
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