import { useEffect, useState } from "react";
import "./styles/Orders.css";

const STATUS_FLOW = {
  pendiente: "confirmado",
  confirmado: "preparacion",
  preparacion: "enviado",
};

export default function Orders() {
  const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("todos"); // Estado para el filtro de estado de pedidos

  /* OBTENER PEDIDOS*/
  const fetchOrders = async () => { // funcion para obtener los pedidos desde el backend
    try {
      const res = await fetch("http://localhost:4000/api/orders");
      if (!res.ok) throw new Error();

      const data = await res.json();

      const ordered = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setOrders(ordered);
    } catch {
      setError("No se pudieron cargar los pedidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const isNewOrder = (date) => { // funcion para determinar si un pedido es nuevo (menos de 10 minutos)
    const diff = Date.now() - new Date(date).getTime();
    return diff < 10 * 60 * 1000; // 10 minutos
  };

  const filteredOrders =
    filter === "todos"
      ? orders
      : orders.filter(o => o.status === filter);

  /* ACCIONES*/
  const updateStatus = async (orderId, status) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status })
        }
      );

      if (!res.ok) throw new Error();
      fetchOrders();
    } catch {
      alert("No se pudo actualizar el estado");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("¿Eliminar este pedido?")) return;

    try {
      const res = await fetch( 
        `http://localhost:4000/api/orders/${orderId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error(); // si la respuesta no es ok, lanza un error

      setOrders(prev => prev.filter(o => o.id !== orderId));
    } catch {
      alert("No se pudo eliminar el pedido");
    }
  };

  /*  UI*/
  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="orders-container">
      <h1 className="orders-title">Pedidos</h1>

      {/* FILTROS */}
      <div className="filters">
        {["todos", "pendiente", "confirmado", "preparacion", "enviado", "cancelado"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <p>No hay pedidos en este estado.</p>
      )}

      {filteredOrders.map(order => {
        const nextStatus = STATUS_FLOW[order.status];

        return (
          <div
            key={order.id}
            className={`order-card ${isNewOrder(order.created_at) ? "new" : ""}`}
          >
            <header className="order-header">
              <span className={`status status-${order.status}`}>
                {order.status}
              </span>

              {isNewOrder(order.created_at) && (
                <span className="badge-new">Nuevo</span>
              )}
            </header>

            <p><strong>Negocio:</strong> {order.business_name}</p>

            <p>
              <strong>Total:</strong>{" "}
              ₡{Number(order.total).toLocaleString("es-CR")}
            </p>

            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>

            <ul className="products">
              {order.products.map((p, i) => (
                <li key={i}>
                  {p.quantity} × {p.name} — ₡
                  {(p.price * p.quantity).toLocaleString("es-CR")}
                </li>
              ))}
            </ul>

            <div className="actions">
              {nextStatus && (
                <button
                  className="btn-primary"
                  onClick={() => updateStatus(order.id, nextStatus)}
                >
                  Pasar a {nextStatus}
                </button>
              )}

              {order.status !== "enviado" && order.status !== "cancelado" && (
                <button
                  className="btn-cancel"
                  onClick={() => updateStatus(order.id, "cancelado")}
                >
                  Cancelar
                </button>
              )}

              {["pendiente", "cancelado"].includes(order.status) && (
                <button
                  className="btn-delete"
                  onClick={() => deleteOrder(order.id)}
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        );
      })}
    </main>
  );
}
