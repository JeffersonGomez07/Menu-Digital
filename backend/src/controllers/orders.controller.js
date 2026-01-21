import pool from "../config/db.js";

export const createOrder = async (req, res) => {
  try {
    const { businessId, products, total } = req.body; // esperamos recibir businessId, products y total en el cuerpo de la solicitud

    const query = `
      INSERT INTO orders (business_id, products, total)
      VALUES ($1, $2, $3)
      RETURNING * 
    `; // El RETURNING devuelve el pedido recién creado, sin hacer otro SELECT

    const values = [
      businessId,
      JSON.stringify(products), // convertimos el arreglo de productos a JSON
      total
    ];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("ERROR AL CREAR PEDIDO:", error);
    res.status(500).json({ message: "Error al crear pedido" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const query = `
      SELECT 
        o.id,
        o.business_id,
        o.products,
        o.total,
        o.status,
        o.created_at,
        b.name AS business_name
      FROM orders o
      JOIN businesses b ON b.id = o.business_id
      ORDER BY o.created_at DESC;
    `;

    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error("ERROR AL OBTENER PEDIDOS:", error);
    res.status(500).json({ message: "Error al obtener pedidos" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params; // obtener el id del pedido desde los parametros de la URL
    const { status } = req.body; // obtener el nuevo estado desde el cuerpo de la solicitud

    console.log("ID:", id);
    console.log("STATUS RECIBIDO:", status);

    const allowedStatus = [
      "pendiente",
      "confirmado",
      "preparacion",
      "enviado",
      "cancelado"
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Estado no válido" });
    }

    const query = `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *
    `;

    const result = await pool.query(query, [status, id]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("ERROR AL ACTUALIZAR ESTADO:", error);
    res.status(500).json({ message: "Error al actualizar estado" });
  }
};

export const deleteOver = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      DELETE FROM orders
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) { // rowCount indica cuantas filas fueron afectadas
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    res.json({ message: "Pedido eliminado correctamente", order: result.rows[0] });
  } catch (error) {
    console.error("ERROR AL ELIMINAR PEDIDO:", error);
    res.status(500).json({ message: "Error al eliminar pedido" });
  }
};