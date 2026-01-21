Aplicación de Menú Digital y Pedidos

Aplicación web de menú digital interactivo orientada a restaurantes y pequeños negocios, diseñada para que los clientes puedan visualizar productos, agregarlos a un carrito y realizar pedidos de forma rápida y sencilla.

El proyecto está enfocado en experiencia de usuario (UX), claridad visual y flujo directo al pedido, priorizando funcionalidad sobre elementos decorativos innecesarios.

🚀 Tecnologías utilizadas
Frontend

Next.js

React

CSS personalizado

JavaScript (ES6+)

Herramientas

Git & GitHub

Visual Studio Code

Vercel (deploy)

🎯 Funcionalidades principales

📋 Visualización clara del menú por categorías

🍔 Listado de productos con imagen, descripción y precio

➕ Agregar y quitar productos del carrito

🛒 Carrito de compras interactivo

💰 Cálculo automático del total del pedido

📱 Diseño responsive (mobile-first)

📲 Opción de envío del pedido vía WhatsApp

⚡ Interfaz rápida, limpia y enfocada en la acción principal: ordenar

🧠 Decisiones de diseño y UX

Se eliminaron banners promocionales y reseñas para no distraer al usuario.

El objetivo principal es reducir fricción entre:

ver menú → elegir productos → realizar pedido

La jerarquía visual prioriza:

Producto

Precio

Acción (Agregar al carrito)

Estas decisiones reflejan un enfoque orientado a producto real, no solo a diseño visual.

📂 Estructura del proyecto
/app
 ├── components
 │   ├── ProductCard.jsx
 │   ├── Cart.jsx
 │   └── CategorySection.jsx
 ├── styles
 │   └── menu.css
 ├── page.jsx
 └── layout.jsx


El código está organizado de forma modular para facilitar mantenimiento y escalabilidad.

▶️ Instalación y ejecución local

Clonar el repositorio:

git clone https://github.com/tu-usuario/menu-digital


Instalar dependencias:

npm install


Ejecutar el proyecto:

npm run dev


Abrir en el navegador:

http://localhost:3000

🌐 Demo en producción

🔗 Demo en Vercel

(reemplaza con tu link real)

📌 Posibles mejoras futuras

Panel de administración para negocios

Gestión dinámica de productos y categorías

Integración con backend (API / Base de Datos)

Historial de pedidos

Autenticación de usuarios

Métodos de pago en línea

👤 Autor

Jeff
Desarrollador Web / Full Stack Junior
📍 Costa Rica

GitHub: https://github.com/tu-usuario

LinkedIn: https://linkedin.com/in/tu-perfil

💬 Nota final

Este proyecto fue desarrollado como una aplicación funcional y realista, aplicando buenas prácticas de frontend, UX y estructura de código, con enfoque en un caso de uso real para restaurantes.