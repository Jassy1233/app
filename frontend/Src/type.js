document.addEventListener('DOMContentLoaded', function () {

    const words = ["INFORLISTIN", "APP RESERVAS"];
    const h1Element = document.getElementById("text");
    let wordIndex = 0; 
    let index = 0;  
    let borrar = false;
    let escribirVelocidad = 150; 
    let borrarVelocidad = 100; 
    let pausa = 200; 

    let cursor = document.createElement("span");
    cursor.classList.add("cursor");
    h1Element.appendChild(cursor);

    function typeWriter() {
        const currentWord = words[wordIndex]; 
        if (!borrar && index < currentWord.length) {
            h1Element.textContent += currentWord.charAt(index);
            index++;
            setTimeout(typeWriter, escribirVelocidad);
        } else if (borrar && index > 0) { 
            h1Element.textContent = h1Element.textContent.slice(0, -1);
            index--;
            setTimeout(typeWriter, borrarVelocidad);
        } else if (index === currentWord.length) {
            borrar = true;
            setTimeout(typeWriter, pausa);
        } else if (index === 0 && borrar) {         
            wordIndex = (wordIndex + 1) % words.length; 
            borrar = false;
            setTimeout(typeWriter, pausa);
        }
    }

    typeWriter(); 
});
