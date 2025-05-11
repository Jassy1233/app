document.addEventListener("DOMContentLoaded", () => {
  const videoBtn = document.getElementById("videoToggleBtn");
  const overlay = document.getElementById("videoOverlay");
  const closeBtn = document.getElementById("closeVideoBtn");
  const nextBtn = document.getElementById("nextVideoBtn");
  const video = document.getElementById("mainVideo");

  const videoSources = [
    "./IMG/tablet.mp4",
    "./IMG/doble.mp4",
  ];

    let currentIndex = 0;

  function loadVideo(index) {
    if (!videoSources[index]) return;

    video.pause();
    
    const newSource = `${videoSources[index]}?t=${Date.now()}`;
    
    video.currentTime = 0;
    
    video.src = newSource;
    
    video.addEventListener('canplaythrough', () => {
      video.play().catch(err => console.error("Error al reproducir:", err));
    }, { once: true });
  }

  if (videoBtn) {
    videoBtn.addEventListener("click", () => {
      overlay.style.display = "flex";
      loadVideo(currentIndex);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      video.pause();
      video.currentTime = 0;
    });
  }

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
        video.pause();
        video.currentTime = 0;
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % videoSources.length;
      loadVideo(currentIndex);
    });
  }
});
