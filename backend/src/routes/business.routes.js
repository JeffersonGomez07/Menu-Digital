import { Router } from 'express';
import pool from "../config/db.js";

const router = Router(); // Creamos una instancia del router de Express

// crear negocio

router.post("/",  async (req, res) =>{
    const {name, address, phone} = req.body; // obtenemos los datos del cuerpo de la solicitud

    const result = await pool.query( // ejecutamos la consulta SQL para insertar un nuevo negocio
        "INSERT INTO businesses (name, address, phone) VALUES ($1, $2, $3) RETURNING *",
        [name, address, phone]
    );

    res.json(result.rows[0]); // respondemos con el negocio creado
});

// listar negocios
router.get("/", async (req, res) => { // manejador de la ruta GET /businesses
    const result = await pool.query("SELECT * FROM businesses"); // pool.query ejecuta la consulta SQL
    res.json(result.rows); // respondemos con los negocios obtenidos
});

export default router; // exportamos el router para usarlo en otras partes del servidor