// Add observer for animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0'; // Initial state
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
});

// Copy PIX functionality
function copyPix() {
    const pixInput = document.getElementById('pixKey');
    pixInput.select();
    pixInput.setSelectionRange(0, 99999); /* For mobile devices */

    navigator.clipboard.writeText(pixInput.value).then(() => {
        const btn = document.querySelector('.btn-small');
        const originalText = btn.innerText;
        btn.innerText = 'Copiado!';
        btn.style.background = '#0ff'; // Neon Cyan

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}
