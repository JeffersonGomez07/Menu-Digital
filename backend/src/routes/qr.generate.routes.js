import { Router } from "express";
import { generateBusinessQR } from "../controllers/qr.controller.js";

const router = Router();

router.post("/:businessId", generateBusinessQR);

export default router;

