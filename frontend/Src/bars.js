document.addEventListener('DOMContentLoaded', function () {
    const scrollBtn = document.getElementById('scrollBtn1');
    const targetSection = document.getElementById('sec1');
    const imagePlaceholder = document.querySelector('.image-placeholder');
    const bars = document.querySelectorAll('.bar');
    let animationTriggered = false;

    function animateBars() {
        if (animationTriggered) return;
        animationTriggered = true;

        imagePlaceholder.classList.add('visible');
        bars.forEach(bar => {
            bar.classList.add('animate');
        });
    }

    if (scrollBtn && targetSection) {
        scrollBtn.addEventListener('click', function () {
            targetSection.scrollIntoView({ behavior: 'smooth' });

            setTimeout(() => {
                animateBars();
            }, 800);
        });
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0
        );
    }

    window.addEventListener('scroll', () => {
        if (isInViewport(targetSection)) {
            animateBars();
        }
    });
});
