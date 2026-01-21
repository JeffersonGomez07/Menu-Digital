import { Router } from "express";
import { getmenuBySlug } from "../controllers/menu.controller.js";

const router = Router();

// ruta publica del menu por QR
router.get("/menu/:slug", getmenuBySlug);

export default router;