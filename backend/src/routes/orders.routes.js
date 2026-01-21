import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus, deleteOver} from "../controllers/orders.controller.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id/status", updateOrderStatus); // .put porque se actualiza un recurso existente
router.delete("/:id", deleteOver);

export default router;
