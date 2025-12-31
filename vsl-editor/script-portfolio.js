// === ANIMATED COUNTER ===
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Anima contadores quando visíveis
            if (entry.target.classList.contains('result-number')) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    animateCounter(entry.target, number);
                }
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa cards de resultados
document.querySelectorAll('.result-card, .portfolio-item, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// === LIVE VIEW COUNTER ===
function updateViewCounter() {
    const statValue = document.querySelector('.stat-value');
    if (!statValue) return;

    const baseViews = 250;
    const variation = Math.floor(Math.random() * 50);
    statValue.textContent = baseViews + variation;
}

// Atualiza a cada 8 segundos
setInterval(updateViewCounter, 8000);

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

// === CTA TRACKING ===
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        console.log('CTA Clicked:', this.textContent.trim());

        // Google Analytics tracking (adicione seu código)
        // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': 'Main CTA' });

        // Facebook Pixel (adicione seu código)
        // fbq('track', 'Lead');
    });
});

// === VIDEO PLAY TRACKING ===
const videoFrames = document.querySelectorAll('.video-frame iframe, .portfolio-thumb iframe');
videoFrames.forEach((iframe, index) => {
    iframe.addEventListener('load', () => {
        console.log(`Video ${index + 1} loaded`);
    });
});

// === TESTIMONIALS ROTATION (OPCIONAL) ===
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function rotateTestimonials() {
    if (testimonials.length === 0) return;

    testimonials.forEach((t, i) => {
        if (i === currentTestimonial) {
            t.style.transform = 'scale(1.05)';
            t.style.borderColor = 'rgba(139, 92, 246, 0.6)';
        } else {
            t.style.transform = 'scale(1)';
            t.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }
    });

    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

// Rotaciona depoimentos a cada 5 segundos
setInterval(rotateTestimonials, 5000);

// === EXIT INTENT POPUP (OPCIONAL) ===
let exitIntentShown = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        // Aqui você pode mostrar um popup de última chance
        console.log('Exit intent detected! Show popup or offer.');
    }
});

// === SCROLL PROGRESS INDICATOR ===
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    // Você pode usar isso para mostrar uma barra de progresso
    // document.querySelector('.progress-bar').style.width = scrolled + '%';
});

// === LAZY LOAD IFRAMES ===
const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
                iframeObserver.unobserve(iframe);
            }
        }
    });
});

// Para usar lazy load, mude src para data-src no HTML e descomente:
// document.querySelectorAll('iframe[data-src]').forEach(iframe => {
//     iframeObserver.observe(iframe);
// });
