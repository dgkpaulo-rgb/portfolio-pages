// Portfolio v3.0 - Enhanced Interactions

// ==========================================
// SMOOTH REVEAL ON SCROLL
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInElements = document.querySelectorAll('.project-card, .skill-chip, .process-item, .contact-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const nav = document.querySelector('nav'); // Fixed: was .nav
let lastScroll = 0;

if (nav) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.padding = '0.75rem 0';
            nav.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            nav.style.padding = '1.25rem 0';
            nav.style.background = 'rgba(10, 10, 15, 0.8)';
        }

        lastScroll = currentScroll;
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// PARALLAX EFFECT ON GRADIENT ORBS
// ==========================================
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==========================================
// PROJECT CARD TILT EFFECT
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==========================================
// MOBILE HAMBURGER MENU
// ==========================================
const hamburger = document.querySelector('.hamburger');
const body = document.body;

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        body.classList.toggle('mobile-menu-active');
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            body.classList.remove('mobile-menu-active');
        });
    });
}

// ==========================================
// WHATSAPP FORM SUBMISSION
// ==========================================
const budgetForm = document.querySelector('.budget-form');

if (budgetForm) {
    budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const nome = budgetForm.querySelector('input[type="text"]')?.value || '';
        const email = budgetForm.querySelector('input[type="email"]')?.value || '';
        const projeto = budgetForm.querySelector('select')?.value || '';
        const mensagem = budgetForm.querySelector('textarea')?.value || '';

        // Map project types to readable names
        const projectTypes = {
            'site': 'Landing Page / Site',
            'visual': 'Identidade Visual',
            'video': 'Edição de Vídeo',
            'social': 'Gestão de Social Media'
        };

        // Format WhatsApp message
        const whatsappMessage = `*Solicitação de Orçamento - NeonCut Studio*\n\n` +
            `*Nome/Empresa:* ${nome}\n` +
            `*E-mail:* ${email}\n` +
            `*Tipo de Projeto:* ${projectTypes[projeto] || projeto}\n\n` +
            `*Mensagem:*\n${mensagem}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp number (from the floating button)
        const whatsappNumber = '5527998818305';

        // Redirect to WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

        // Optional: Reset form after submission
        budgetForm.reset();
    });
}



// ==========================================
// SERVICES CAROUSEL LOGIC
// ==========================================
const track = document.querySelector('.carousel-track');
const slides = Array.from(track?.children || []);
const nextButton = document.querySelector('.carousel-control.next');
const prevButton = document.querySelector('.carousel-control.prev');
const dotsNav = document.querySelector('.carousel-dots');

if (track && slides.length > 0) {
    let currentSlideIndex = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(index));
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.querySelectorAll('.dot'));

    const updateControls = (index) => {
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    const moveToSlide = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        currentSlideIndex = index;
        updateControls(index);
    };

    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(currentSlideIndex);
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        moveToSlide(currentSlideIndex);
    });

    // Auto-play
    let autoPlayInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(currentSlideIndex);
    }, 5000);

    // Stop auto-play on interaction
    const stopAutoPlay = () => clearInterval(autoPlayInterval);
    [nextButton, prevButton, dotsNav].forEach(el => el.addEventListener('click', stopAutoPlay));

    // Touch support (Simple)
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextButton.click();
        } else if (touchEndX - touchStartX > 50) {
            prevButton.click();
        }
    }, { passive: true });
}

// ==========================================
// LOADING COMPLETE
// ==========================================
window.addEventListener('load', () => {
    console.log('✨ All animations ready');
});
