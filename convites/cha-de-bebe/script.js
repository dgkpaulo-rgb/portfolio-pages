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
        btn.style.background = '#25D366';

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
    });
}

// Music Control Logic
const musicControl = document.getElementById('musicControl');
const audio = new Audio('music.mp3');
audio.loop = true;
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        audio.pause();
        musicControl.style.opacity = '0.5';
        musicControl.innerHTML = '<i class="fas fa-music"></i>';
        musicControl.classList.remove('pulse');
        isPlaying = false;
    } else {
        audio.play().then(() => {
            musicControl.style.opacity = '1';
            musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicControl.classList.add('pulse');
            isPlaying = true;
        }).catch(error => {
            console.log("Autoplay blocked by browser:", error);
        });
    }
}

musicControl.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click from firing immediately
    toggleMusic();
});

// Attempt Autoplay
document.addEventListener('DOMContentLoaded', () => {
    // Try to play immediately
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            isPlaying = true;
            musicControl.style.opacity = '1';
            musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
            musicControl.classList.add('pulse');
        }).catch(error => {
            console.log("Autoplay prevented. Waiting for interaction.");
            // If blocked, play on first interaction anywhere
            const startAudio = () => {
                audio.play();
                isPlaying = true;
                musicControl.style.opacity = '1';
                musicControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                musicControl.classList.add('pulse');
                document.removeEventListener('click', startAudio);
                document.removeEventListener('touchstart', startAudio);
            };
            document.addEventListener('click', startAudio);
            document.addEventListener('touchstart', startAudio);
        });
    }
});

// Add pulse animation for music button in CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes pulse-music {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    .pulse {
        animation: pulse-music 1.5s infinite;
        color: var(--primary-color);
    }
`;
document.head.appendChild(styleSheet);
