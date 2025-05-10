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
        alert(result.mensaje);
        form.reset();
      } else {
        alert(result.mensaje || 'Error al enviar el mensaje');
      }
    } catch (err) {
      alert('Error de red. Inténtalo de nuevo.');
      console.error(err);
    }
  });
});