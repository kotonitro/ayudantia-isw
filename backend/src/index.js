import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/configDb.js";
import { routerApi } from "./routes/index.routes.js";
import { createUser } from "./config/initialSetup.js";
import { HOST,PORT } from "./config/configEnv.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRoutes); 
app.use("/profile", profileRoutes);
// Ruta principal de bienvenida
app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API REST con TypeORM!");
});

// Inicializa la conexión a la base de datos
connectDB()
  .then(async () => {
    // Carga todas las rutas de la aplicación
    routerApi(app);
    // Levanta el servidor Express
    await createUser();
    
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://${HOST}:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.log("Error al conectar con la base de datos:", error);
    process.exit(1);
  });
