
const form = document.getElementById('reservaForm');
const dialog = document.getElementById('notificacionDialog');
const mensaje = document.getElementById('mensajeDialogo');
const cerrarDialogo = document.getElementById('cerrarDialogo');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;
  let errores = [];

  const campos = [
    { id: 'nombre', label: 'labelNombre' },
    { id: 'correo', label: 'labelCorreo', tipo: 'email' },
    { id: 'telefono', label: 'labelTelefono' },
    { id: 'fecha', label: 'labelFecha' },
  ];

  const datos = {};

  campos.forEach(campo => {
    const input = document.getElementById(campo.id);
    const label = document.getElementById(campo.label);
    let valido = true;

    if (!input.value.trim()) {
      valido = false;
      errores.push(`El campo ${label.textContent} es obligatorio.`);
    }

    if (campo.tipo === 'email' && input.value && !/\S+@\S+\.\S+/.test(input.value)) {
      valido = false;
      errores.push(`El correo electrónico no tiene un formato válido.`);
    }

    if (valido) {
      input.style.border = '2px solid #4CAF50';
      label.style.color = '#4CAF50';
      datos[campo.id] = input.value.trim();
    } else {
      input.style.border = '2px solid red';
      label.style.color = 'red';
      input.classList.add('shake'); // animación
      isValid = false;
    }
  });

  datos.comentarios = document.getElementById('comentarios').value.trim();

  if (isValid) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(datos);
    localStorage.setItem('registros', JSON.stringify(registros));

    mensaje.textContent = '¡Reserva realizada con éxito!';
    dialog.showModal();
    form.reset();

    document.querySelectorAll('input, textarea').forEach(el => {
      el.style.border = '1px solid #ccc';
    });
    document.querySelectorAll('label').forEach(label => {
      label.style.color = '#333';
    });
  } else {
    mensaje.innerHTML = errores.join('<br>');
    dialog.showModal();
  }
});

cerrarDialogo.addEventListener('click', () => {
  dialog.close();
});

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('animationend', () => {
    input.classList.remove('shake');
  });
});

