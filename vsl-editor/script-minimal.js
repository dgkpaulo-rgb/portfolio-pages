// === VIEW COUNTER ===
function updateViewCounter() {
    const indicator = document.querySelector('.watch-indicator span');
    if (!indicator) return;

    // Simula visualizações variando entre 300-400
    const baseViews = 300;
    const variation = Math.floor(Math.random() * 100);
    const views = baseViews + variation;

    indicator.innerHTML = `<strong>${views}</strong> pessoas assistindo agora`;
}

// Atualiza contador a cada 10 segundos
setInterval(updateViewCounter, 10000);

// === CTA TRACKING ===
document.getElementById('mainCTA').addEventListener('click', function (e) {
    // Track analytics aqui (Google Analytics, Facebook Pixel, etc)
    console.log('CTA clicked - User converting!');

    // Adiciona feedback visual
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = '';
    }, 200);
});

// === SCROLL ANIMATIONS ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa elementos para animação no scroll
document.querySelectorAll('.video-section, .cta-section, .trust-section').forEach(el => {
    observer.observe(el);
});

// === PREVENT ACCIDENTAL EXIT ===
let videoStarted = false;

// Detecta se o vídeo foi iniciado
const iframe = document.querySelector('iframe');
if (iframe) {
    iframe.addEventListener('load', () => {
        // Quando vídeo carrega, marca como iniciado
        setTimeout(() => {
            videoStarted = true;
        }, 3000);
    });
}

// Alerta ao tentar sair (apenas se vídeo foi iniciado)
window.addEventListener('beforeunload', (e) => {
    if (videoStarted) {
        e.preventDefault();
        e.returnValue = 'Tem certeza que deseja sair? Você está prestes a descobrir como transformar seus vídeos!';
        return e.returnValue;
    }
});

// === COPY URGENCY (OPCIONAL) ===
// Adiciona urgência baseada em tempo
function addUrgency() {
    const now = new Date();
    const hour = now.getHours();

    let urgencyText = '';

    if (hour >= 18 || hour < 6) {
        urgencyText = '🌙 Vagas limitadas para esta semana!';
    } else {
        urgencyText = '⚡ Apenas 3 vagas disponíveis hoje!';
    }

    // Você pode adicionar isso dinamicamente na página se quiser
    console.log('Urgency message:', urgencyText);
}

addUrgency();

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
