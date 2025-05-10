document.addEventListener('DOMContentLoaded', function () {
    // Slide de los botones : 

    //Scroll del indicador
    document.getElementById('scrollBtn1').addEventListener('click', function() {
        document.getElementById('sec1').scrollIntoView({ behavior: 'smooth'});
    })

    // Scroll de la seccion 2 :
    document.getElementById('scrollBtn2').addEventListener('click', function () {
        document.getElementById('sec2').scrollIntoView({ behavior: 'smooth' });
    });

    // Scroll de la seccion 3 :
    document.getElementById('scrollBtn3').addEventListener('click', function () {
        document.getElementById('sec3').scrollIntoView({ behavior: 'smooth' })
    })

    // Modo oscuro : 

    document.getElementById('oscuro').addEventListener('click', function() {
        //para el body
        document.body.classList.toggle('modoOscuro')

        //para el nav
        const nav = document.querySelector('nav')
        nav.classList.toggle('modoOscuro')

        localStorage.setItem('darkMode', document.body.classList.contains('oscuro'))

    })

    if(localStorage.getItem('modoOscuro') === 'true'){
        document.body.classList.add('oscuro')
        document.querySelector('nav').classList.add('modoOscuro')
    }

})