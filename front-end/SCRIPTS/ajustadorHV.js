function ajustaAlturaComViewport() {
    const alturaReal = window.visualViewport?.height || window.innerHeight;
    document.documentElement.style.setProperty('--altura-viewport', `${alturaReal}px`);
}

ajustaAlturaComViewport();
window.visualViewport?.addEventListener('resize', ajustaAlturaComViewport);
window.addEventListener('orientationchange', ajustaAlturaComViewport);


const input = document.querySelector('.chat-input');
input?.addEventListener('focus', () => {
    setTimeout(() => {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300); 
});