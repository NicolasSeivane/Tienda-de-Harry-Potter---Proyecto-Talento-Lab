document.addEventListener('DOMContentLoaded', function () {
  cargarCarrito();
  activarBotonesAgregar();

  const btnVaciar = document.getElementById('vaciar-carrito');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', function () {
      localStorage.removeItem('carrito');
      cargarCarrito();
    });
  }
});

function activarBotonesAgregar() {
  const botones = document.getElementsByClassName('agregar-carrito');
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', agregarProducto);
  }
}


function eliminarProducto(event) {
  const boton = event.target;
  const productoId = boton.getAttribute('producto-id');
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(p => p.id !== productoId);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

function activarBotonesEliminar() {
  const botones = document.getElementsByClassName('eliminar-carrito');
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener('click', function (event) {
      const boton = event.target;
      const productoId = boton.getAttribute('producto-id');

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito = carrito.filter(p => p.id !== productoId);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      cargarCarrito();
    });
  }
}

function agregarProducto(event) {
  const boton = event.target;

  const producto = {
    id: boton.getAttribute('producto-id'),
    nombre: boton.getAttribute('producto-nombre'),
    precio: parseFloat(boton.getAttribute('producto-precio')),
    cantidad: 1
  };

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Verificamos si el producto ya se encuentra en el carrito para incrementar la cantidad
  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  cargarCarrito();
}

function cargarCarrito() {
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  listaCarrito.innerHTML = "";

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let total = 0;

  carrito.forEach((producto, index) => {
    let li = document.createElement("li");

    let subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    li.innerHTML = `
  <span>${producto.nombre}</span>
  <button class="eliminar-carrito" producto-id="${producto.id}" style="float:right; color:red; font-weight:bold; background:none; border:none; cursor:pointer;">X</button>
  <br>
  <small>$${producto.precio} c/u</small><br>
  <strong>Cant:</strong>
  <button class="menos" data-index="${index}">-</button>
  ${producto.cantidad}
  <button class="mas" data-index="${index}">+</button>
  <br>
  <strong>Subtotal: $${subtotal}</strong>
`;

    listaCarrito.appendChild(li);
  });

  totalCarrito.innerHTML = `<strong>Total:</strong> $${total}`;

  // Asignación de manejadores de eventos para los controles de cantidad y eliminación
  activarBotonesCantidad();
  activarBotonesEliminar();
}

function activarBotonesCantidad() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  document.querySelectorAll('.mas').forEach(btn => {
    btn.addEventListener('click', function () {
      let index = this.getAttribute('data-index');
      carrito[index].cantidad++;
      localStorage.setItem('carrito', JSON.stringify(carrito));
      cargarCarrito();
    });
  });

  document.querySelectorAll('.menos').forEach(btn => {
    btn.addEventListener('click', function () {
      let index = this.getAttribute('data-index');

      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
      } else {
        carrito.splice(index, 1);
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      cargarCarrito();
    });
  });
}