document.addEventListener('DOMContentLoaded', () => {
  const words = document.querySelectorAll('.word');
  let currentIndex = 0;
  
  if (words.length === 0) return;

  function rotateWords() {
    words[currentIndex].classList.remove('active');
    words[currentIndex].style.opacity = '0';
    words[currentIndex].style.transform = 'translateY(-10px)';
    
    currentIndex = (currentIndex + 1) % words.length;
    
    words[currentIndex].classList.add('active');
    words[currentIndex].style.opacity = '1';
    words[currentIndex].style.transform = 'translateY(0)';
  }

  const interval = setInterval(rotateWords, 2000);

  window.addEventListener('beforeunload', () => {
    clearInterval(interval);
  });
  
  words[0].style.opacity = '1';
  words[0].style.transform = 'translateY(0)';
});