import express from "express";
import cors from "cors";
import businessRoutes from "./routes/business.routes.js";
import menuRoutes from "./routes/menu.routes.js";
import qrGenerateRoutes from "./routes/qr.generate.routes.js";
import ordersRoutes from "./routes/orders.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/menu", menuRoutes)
app.use("/api/businesses", businessRoutes);
app.use("/api/qr/generate", qrGenerateRoutes);
app.use("/api/orders", ordersRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando correctamente" });
});

export default app;
