import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";

import app from "./app.js";
import publicRoutes from "./routes/public.routes.js";

app.use(express.static(path.join(process.cwd(), "src/public")));
app.use("/qr", express.static(path.join(process.cwd(), "public/qr")));

// luego las rutas
app.use(publicRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
