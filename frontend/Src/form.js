document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('miFormulario');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      nombre: formData.get('Nombre'),
      email: formData.get('Email'),
      telefono: formData.get('Telefono'),
      negocio: formData.get('Tipo_negocio'),
      observaciones: formData.get('Observaciones')
    };

    try {
      const response = await fetch('http://localhost:3000/enviar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          text: result.mensaje,
          icon: "success",
          confirmButtonText: '¡Gracias!'
        })
        form.reset();
      } else {
        Swal.fire({
          text: result.mensaje,
          icon: "error",
        })
      }
    } catch (err) {
      Swal.fire({
        text: 'Error de red, intentalo de nuevo mas tarde',
        icon: "question",

      })
      console.error(err);
    }
  });
});