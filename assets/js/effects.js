// GTA Zoom Sound Effect (optional)
window.addEventListener('load', () => {
  const audio = new Audio('assets/sounds/gta-whoosh.mp3');
  audio.volume = 0.3;
  audio.play().catch(e => console.log("Auto-play prevented:", e));
});

// To run only once per session
if (!sessionStorage.getItem('gtaShown')) {
  document.getElementById('gta-loader').style.display = 'flex';
  sessionStorage.setItem('gtaShown', 'true');
} else {
  document.getElementById('gta-loader').remove();
  document.getElementById('preloader').style.display = 'flex';
}