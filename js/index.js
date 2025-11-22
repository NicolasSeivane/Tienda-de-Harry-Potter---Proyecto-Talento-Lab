// Seleccionamos los contenedores
const productsContainer = document.querySelector(".seccion-productos");
const commentsContainer = document.querySelector(".seccion-reseñas");

// Llamamos a la API y procesamos los datos
fetch("productos.json")
  .then(response => response.json())
  .then(data => {
    // Tomamos 4 productos con el método slice.
    const productos = data.productos.slice(0, 8);

    // Renderizamos los productos
    let productsHTML = "<h2>Nuestra Magia</h2> <div class=\"productos-container\">";
    for (let i = 0; i < productos.length; i++) {
      const prod = productos[i];
      productsHTML += `
        <article class="producto-card">
          <h2>${prod.nombre}</h2>
          <img src="${prod.imagen}" alt="${prod.alt}">
          <p>${prod.descripcion.slice(0, 50)}</p>
          <h3>$${prod.precio}</h3>

          <div class="card-footer"><button class="agregar-carrito"producto-id="${prod.id}"producto-nombre="${prod.nombre}"producto-precio="${prod.precio}">Agregar al Carrito</button>
          </div>
        </article>
      `;
    }
    productsContainer.innerHTML = productsHTML;
    activarBotonesAgregar();


  // Tomamos 3 reseñas
    const reseñas = data.reseñas.slice(0, 4);

    // Renderizamos las reseñas
    let reviewsHTML = "<h2>Reseñas de Clientes</h2><div class=\"reseñas-grid\">";
    for (let i = 0; i < reseñas.length; i++) {
      const reseña = reseñas[i];
      console.log(reseña);
      
      reviewsHTML += `
      <article class="reseña-card">
                    <p>${reseña.texto}</p>
                    <p class="cliente">${reseña.cliente}</p>
                </article>
      `;
    }
    commentsContainer.innerHTML = reviewsHTML;
  })
  .catch(error => console.log("Error cargando la API:", error));
