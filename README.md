Descripción general

Este proyecto es un sistema de menú digital pensado para restaurantes y sodas, que permite a los clientes acceder al menú mediante un código QR, visualizar productos de forma clara y moderna, realizar pedidos desde el celular y enviarlos por WhatsApp.
Al mismo tiempo, el negocio cuenta con un panel administrativo para gestionar y dar seguimiento a los pedidos en tiempo real.

El sistema está dividido en tres partes principales:

Backend (API y base de datos)

Menú público para clientes (Next.js)

Panel de administración (React)

Tecnologías utilizadas
Backend

Node.js

Express

PostgreSQL

UUID

API REST

Frontend cliente

Next.js

React

CSS moderno

Mobile-first design

Panel administrador

React

CSS

Fetch API

Arquitectura del proyecto

El proyecto sigue una arquitectura separada por responsabilidades, lo que facilita su mantenimiento, escalabilidad y comprensión.

Backend
Estructura de carpetas
backend/
 └── src/
     ├── config/
     │   └── db.js
     ├── controllers/
     │   ├── menu.controller.js
     │   ├── orders.controller.js
     │   └── qr.controller.js
     ├── middleware/
     ├── models/
     ├── public/
     │   ├── products/
     │   └── qr/
     ├── routes/
     │   ├── business.routes.js
     │   ├── menu.routes.js
     │   ├── orders.routes.js
     │   ├── public.routes.js
     │   └── qr.generate.routes.js
     ├── utils/
     │   └── qr.js
     ├── app.js
     └── server.js

Modelo de datos

La base de datos se llama menu_digital.

Tabla businesses

id (UUID, PK)

name (TEXT)

slug (TEXT, UNIQUE)

address (TEXT)

phone (TEXT)

logo_url (TEXT)

created_at (TIMESTAMP)

Tabla categories

id (UUID, PK)

business_id (UUID, FK)

name (TEXT)

created_at (TIMESTAMP)

Tabla products

id (UUID, PK)

category_id (UUID, FK)

name (TEXT)

description (TEXT)

price (NUMERIC)

image_url (TEXT)

available (BOOLEAN)

created_at (TIMESTAMP)

Tabla orders

id (SERIAL, PK)

business_id (UUID, FK)

products (JSONB)

total (NUMERIC)

status (VARCHAR)

created_at (TIMESTAMP)

Funcionalidad clave del backend

Endpoint público del menú por slug:

GET /api/menu/:slug


Generación de códigos QR:

GET /api/qr/generate/:businessId


Gestión de pedidos:

Crear pedido

Listar pedidos

Actualizar estado

Eliminar pedido con validaciones

Los controladores se encargan únicamente de la lógica de negocio y respuesta, mientras que las rutas definen las URLs públicas del sistema.

Menú público (cliente)
Estructura
menu-client/
 └── app/
     └── menu/
         └── [slug]/
             ├── loading.js
             ├── menu.css
             ├── MenuPageClient.jsx
             └── page.js
 └── public/
     └── fondo/
         └── fondo.png

Características del menú

Acceso mediante QR

URL pública y limpia

Diseño mobile-first

Categorías separadas

Cards de productos con imagen, nombre, descripción y precio

Skeleton loader durante la carga

Carrito de compras

Envío del pedido por WhatsApp

Persistencia del carrito usando estado del cliente

URL del menú público
http://localhost:3000/menu/restaurante-el-pueblo

Panel de administración
Estructura
admin-panel/
 └── src/
     ├── pages/
     │   └── Orders.jsx
     ├── utils/
     └── styles/
         └── Orders.css

Funcionalidades del panel admin

Visualización de pedidos

Información del negocio

Productos y cantidades

Total del pedido

Fecha y hora

Estados del pedido:

pendiente

confirmado

preparacion

enviado

cancelado

Validación del flujo de estados

Eliminación de pedidos solo cuando el estado lo permite

Orden automático por fecha

URL del panel administrador
http://localhost:3001/orders

Flujo completo del sistema

El negocio genera un QR desde el backend.

El QR apunta al menú público del negocio.

El cliente escanea el QR desde su celular.

Visualiza el menú y agrega productos al carrito.

Envía el pedido por WhatsApp.

El pedido se guarda en la base de datos.

El administrador gestiona el pedido desde el panel admin.

Estado del proyecto

Proyecto funcional y completo, desarrollado como un sistema real de menú digital con gestión de pedidos.
