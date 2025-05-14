document.addEventListener('DOMContentLoaded', function () {

    // Modo oscuro : 

    document.getElementById('oscuro').addEventListener('click', function () {
        document.body.classList.toggle('modoOscuro');
        document.querySelector('nav').classList.toggle('modoOscuro');

        localStorage.setItem('modoOscuro', document.body.classList.contains('modoOscuro'));
    });
    
    if (localStorage.getItem('modoOscuro') === 'true') {
        document.body.classList.add('modoOscuro');
        document.querySelector('nav').classList.add('modoOscuro');
    }

    //Boton movil
    document.querySelector('.mobile-menu-btn').addEventListener('click', function () {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function (e) {
        const navLinks = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');

        if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Cerrar menú al seleccionar un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
        });
    });

    //Cambiar videos
    document.querySelectorAll('.switch-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const mockup = document.querySelector('.tablet-mockup');
            const video = mockup.querySelector('video');

            document.querySelectorAll('.switch-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (this.dataset.device === 'mobile') {
                mockup.classList.add('mobile-view');
                video.src = './IMG/movil.mp4'; // Video en vertical
            } else {
                mockup.classList.remove('mobile-view');
                video.src = './IMG/tablet.mp4'; // Video horizontal
            }

            video.load();
            video.play();
        });
    });
})