document.addEventListener('DOMContentLoaded', function() {
    // Función de utilidad para verificar visibilidad (solo una declaración)
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0
        );
    }

    // Contador animado
    function animateCounter() {
        const contador = document.getElementById("contador");
        const contadorSection = document.getElementById("clientes-satisfechos");
        
        // Si no existen los elementos, salimos de la función
        if (!contador || !contadorSection) return;

        let animationStarted = false;
        let numero = 35;
        const meta = 120;
        const velocidadAnimacion = 30; // ms entre incrementos

        function startCounter() {
            if (animationStarted) return;
            animationStarted = true;

            const intervalo = setInterval(() => {
                if (numero < meta) {
                    numero++;
                    contador.textContent = numero;
                } else {
                    clearInterval(intervalo);
                }
            }, velocidadAnimacion);
        }

        // Verificación inicial
        if (isInViewport(contadorSection)) {
            startCounter();
        } else {
            // Solo añadimos el listener si no está visible inicialmente
            const scrollHandler = function() {
                if (isInViewport(contadorSection)) {
                    startCounter();
                    window.removeEventListener('scroll', scrollHandler);
                }
            };
            window.addEventListener('scroll', scrollHandler);
        }
    }

    // Iniciamos el contador
    animateCounter();
});