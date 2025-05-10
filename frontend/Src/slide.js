document.addEventListener('DOMContentLoaded', function () {
    const slideElements = document.querySelectorAll('.slide');

  // Desplazar texto de izquierda a derecha

    function showOnScroll() {
        slideElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.8) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', showOnScroll);
    window.addEventListener('load', showOnScroll);
})