"use strict";
import dotenv from "dotenv";
import path from "path";

// Primero intenta cargar .env en el directorio actual (backend/)
dotenv.config();

// Si no se cargaron variables clave (p. ej. DATABASE), intentar cargar .env desde la carpeta padre (raíz del repo)
if (!process.env.DATABASE) {
	const parentEnv = path.resolve(process.cwd(), "..", ".env");
	dotenv.config({ path: parentEnv });
}

export const HOST = process.env.DB_HOST || process.env.HOST || "localhost";
export const PORT = process.env.PORT || 3000;
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_USERNAME = process.env.DB_USERNAME;
export const PASSWORD = process.env.DB_PASSWORD || process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;
export const JWT_SECRET = process.env.JWT_SECRET;
export const cookieKey = process.env.COOKIE_KEY;