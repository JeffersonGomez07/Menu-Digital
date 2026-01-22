/* JS para la pantalla de carga del menu del cliente */
import "./menu.css";

export default function LoadingMenu() { // export permite usar esta funcion en otros archivos
  return (
    <main className="menu-container">
      {/* Header skeleton */}
      <div className="menu-header">
        <div className="skeleton title"></div>
        <div className="skeleton text"></div>
        <div className="skeleton text small"></div>
      </div>
      
      {/* Categorias skeleton */}
      {[1, 2].map(cat => ( // Un arreglo temporal con 2 elementos que se usa para simular 2 categorias, .map es un bucle y cat el valor actual del arreglo
        <section key={cat} className="category"> {/* React exige una key cuando usas .map */}
          <div className="skeleton category-title"></div>

          <div className="products">
            {[1, 2, 3].map(prod => ( // Esta linea hace un bucle para crear tres tarjetas de productos de ejemplo y prod representa el numero del producto
              <div key={prod} className="product-card"> 
                <div className="skeleton image"></div>

                <div className="product-info">
                  <div className="skeleton text"></div>
                  <div className="skeleton text small"></div>
                </div>

                <div className="skeleton price"></div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}