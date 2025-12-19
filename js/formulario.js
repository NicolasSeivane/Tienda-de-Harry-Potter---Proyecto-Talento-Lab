document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contacto-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitamos el envío automático para validar los campos

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre.length < 2) {
            mostrarMensaje("El nombre es demasiado corto.", "error");
            return;
        }

        if (!emailRegex.test(email)) {
            mostrarMensaje("Ingresá un correo electrónico válido.", "error");
            return;
        }

        if (mensaje.length < 5) {
            mostrarMensaje("El mensaje es demasiado corto.", "error");
            return;
        }

        mostrarMensaje("Enviando...", "info");

        form.submit();
    });
});


function mostrarMensaje(texto, tipo) {
    let div = document.createElement("div");
    div.textContent = texto;

    div.className = `mensaje ${tipo}`;

    const form = document.querySelector(".contacto-form");
    form.prepend(div);

    setTimeout(() => div.remove(), 3000);
}