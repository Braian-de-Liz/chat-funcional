function ajustaAlturaTela() {
    const alturaReal = window.innerHeight;
    document.documentElement.style.setProperty('--altura-viewport', `${alturaReal}px`);
}

window.addEventListener('resize', ajustaAlturaTela);
window.addEventListener('orientationchange', ajustaAlturaTela);
window.addEventListener('load', ajustaAlturaTela);