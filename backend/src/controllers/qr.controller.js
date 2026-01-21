import pool from "../config/db.js";
import { generateQR } from "../utils/qr.js";
import fs from "fs";
import path from "path";

const FRONTEND_URL = "http://192.168.1.8:3000"; // frontend

export const generateBusinessQR = async (req, res) => {
  try {
    const { businessId } = req.params;

    const cleanBusinessId = businessId.trim();

    const result = await pool.query(
      "SELECT slug FROM businesses WHERE id = $1 LIMIT 1",
      [cleanBusinessId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Negocio no encontrado" });
    }

    const { slug } = result.rows[0];

    // Eliminar QR viejo si existe
    const qrPath = path.join(process.cwd(), "src/public/qr", `${slug}.png`);
    if (fs.existsSync(qrPath)) fs.unlinkSync(qrPath);

    // Generar QR nuevo
    const qr = await generateQR(`${FRONTEND_URL}/menu/${slug}`, slug);

    res.json({
      message: "Código QR generado correctamente",
      qr,
    });
  } catch (error) {
    console.error("Error al generar el código QR:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
