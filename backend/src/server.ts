import cors from "cors";
import "dotenv/config";
import express from "express";
import { probarConexion } from "./config/database.ts";
import {
  manejarErrores, rutaNoEncontrada,
} from "./middlewares/error.middleware.ts";
import { citaRouter } from "./routes/cita.routes.ts";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// Limpia espacios e ignora la barra '/' final para coincidir exactamente con el origen del navegador
const origenPermitido = (process.env.FRONTEND_URL ?? "http://localhost:5173")
  .trim()
  .replace(/\/$/, "");

app.use(cors({
  origin: origenPermitido,
}));
app.use(express.json());

app.get("/api/salud", (_req, res) => {
  res.json({ mensaje: "API de Veterinaria funcionando" });
});

app.use("/api/citas", citaRouter);
app.use(rutaNoEncontrada);
app.use(manejarErrores);

async function iniciarServidor(): Promise<void> {
  await probarConexion();
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

iniciarServidor().catch((error) => {
  console.error("No fue posible iniciar el servidor:", error);
  process.exit(1);
});