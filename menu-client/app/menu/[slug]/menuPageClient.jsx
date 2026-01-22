/* JSX que tiene como función renderizar el menú del cliente */
"use client";

import { useState } from "react";
import Image from "next/image";
import "./menu.css";

export default function MenuPageClient({ data }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  /* TOAST */
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 3000);
  };

  /* CARRITO */
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    showToast(`${product.name} agregado al carrito`);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* WHATSAPP */
  const getWhatsAppLink = (business, product) => {
    const phone = business.phone.replace(/[^0-9]/g, "");
    const message = `Hola, quiero pedir:
Producto: ${product.name}
Precio: ₡${Number(product.price).toLocaleString("es-CR")}
Negocio: ${business.name}`;

    return `https://wa.me/506${phone}?text=${encodeURIComponent(message)}`;
  };

  const getWhatsAppCartLink = (business) => {
    const phone = business.phone.replace(/[^0-9]/g, "");

    const items = cart
      .map(
        item =>
          `${item.quantity} x ${item.name} (₡${(
            item.price * item.quantity
          ).toLocaleString("es-CR")})`
      )
      .join("\n");

    const message = `Hola, quiero pedir:
${items}

Negocio: ${business.name}
Total: ₡${cartTotal.toLocaleString("es-CR")}`;

    return `https://wa.me/506${phone}?text=${encodeURIComponent(message)}`;
  };

  /* PEDIDO */
  const handleSendOrder = async () => {
    if (cart.length === 0) {
      showToast("El carrito está vacío", "error");
      return;
    }

    const orderData = {
      businessId: data.business.id,
      products: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cartTotal,
    };

    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error();
      showToast("Pedido guardado correctamente");
    } catch {
      showToast("Error al guardar el pedido", "error");
      throw new Error();
    }
  };

  const handleWhatsAppOrder = async () => {
    try {
      await handleSendOrder();
      window.open(getWhatsAppCartLink(data.business), "_blank");
      setCart([]);
    } catch {}
  };

  /* UI */
  return (
    <>
      <main className="menu-container" id="menu">
        <header className="menu-header">
          <h1>{data.business.name}</h1>
          <p>{data.business.address}</p>
          <span>{data.business.phone}</span>
        </header>

        {data.categories.map(category => (
          <section key={category.id} className="category">
            <h2>{category.name}</h2>

            <div className="products">
              {category.products.map(product => (
                <div key={product.id} className="product-card">
                  {product.image_url && (
                    <Image
                      src={`http://localhost:4000${product.image_url}`}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="product-image"
                      unoptimized
                    />
                  )}

                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-price">
                      ₡{Number(product.price).toLocaleString("es-CR")}
                    </div>
                  </div>

                  <div className="product-actions">
                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Agregar al carrito
                    </button>

                    <a
                      href={getWhatsAppLink(data.business, product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-btn"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {cart.length > 0 && (
        <div
          className="cart-bubble"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          {cart.length}
        </div>
      )}

      {cart.length > 0 && (
        <div className={`cart-expanded ${isCartOpen ? "show" : ""}`}>
          <h2>Carrito</h2>

          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.name} x {item.quantity}</span>
              <span>
                ₡{(item.price * item.quantity).toLocaleString("es-CR")}
              </span>
              <button onClick={() => removeFromCart(item.id)}>❌</button>
            </div>
          ))}

          <div className="cart-total">
            Total: ₡{cartTotal.toLocaleString("es-CR")}
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="whatsapp-btn"
            style={{ width: "100%", marginTop: "8px" }}
          >
            Pedir todo por WhatsApp
          </button>
        </div>
      )}

      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}
