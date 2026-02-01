// ==================== DOM ELEMENTS ====================
const coverSection = document.getElementById('cover-section');
const mainContent = document.getElementById('main-content');
const openBtn = document.getElementById('open-btn');
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const heartsContainer = document.getElementById('hearts-container');
const coverHeartsContainer = document.getElementById('cover-hearts');
const redEnvelopeGroom = document.getElementById('red-envelope-groom');
const redEnvelopeBride = document.getElementById('red-envelope-bride');
const giftModal = document.getElementById('gift-modal');
const closeModalBtn = document.getElementById('close-modal');
const qrGroomSection = document.getElementById('qr-groom-section');
const qrBrideSection = document.getElementById('qr-bride-section');
const modalTitle = document.getElementById('modal-title');

// Photo Lightbox Elements
const photoLightbox = document.getElementById('photo-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// ==================== FALLING HEARTS ====================
const heartSymbols = ['❤', '💕', '💗', '💖', '♥', '🩷'];
const heartColors = ['#e74c3c', '#ff6b6b', '#ec407a', '#f06292', '#d32f2f', '#e91e63'];

function createHeart(container, isForCover = false) {
    const heart = document.createElement('div');
    heart.className = isForCover ? 'heart heart-cover' : 'heart';
    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 14 + 10) + 'px';
    heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.animationDuration = (Math.random() * 4 + 5) + 's';
    
    if (isForCover) {
        heart.style.top = '-20px';
    }
    
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 9000);
}

// Start hearts on cover
let coverHeartsInterval;
function startCoverHearts() {
    // Create initial hearts
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createHeart(coverHeartsContainer, true), i * 300);
    }
    // Continue creating hearts
    coverHeartsInterval = setInterval(() => createHeart(coverHeartsContainer, true), 600);
}

// Start hearts on main content
let mainHeartsInterval;
function startMainHearts() {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createHeart(heartsContainer, false), i * 200);
    }
    mainHeartsInterval = setInterval(() => createHeart(heartsContainer, false), 500);
}

// Stop cover hearts
function stopCoverHearts() {
    clearInterval(coverHeartsInterval);
}

// ==================== OPEN INVITATION ====================
openBtn.addEventListener('click', () => {
    // Step 1: Open the envelope flap
    coverSection.classList.add('opening');
    
    // Step 2: After flap opens, lift the card and fade out
    setTimeout(() => {
        coverSection.classList.add('hidden');
        
        // Stop cover hearts
        stopCoverHearts();
        
        // Step 3: Show main content
        setTimeout(() => {
            mainContent.classList.add('visible');
            
            // Try to play music
            bgMusic.play().catch(() => {
                console.log('Autoplay prevented');
            });
            
            // Start main hearts
            startMainHearts();
            
            // Start auto-scroll after 2 seconds
            setTimeout(() => {
                startSmoothScroll();
            }, 2000);
        }, 400);
    }, 800);
});

// ==================== MUSIC CONTROL ====================
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        bgMusic.play();
        musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isPlaying = !isPlaying;
});

bgMusic.addEventListener('play', () => {
    isPlaying = true;
    musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
});

bgMusic.addEventListener('pause', () => {
    isPlaying = false;
    musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
});

// ==================== COUNTDOWN TIMER ====================
function updateCountdown() {
    const weddingDate = new Date('2026-02-08T11:00:00').getTime();
    const vuquyDate = new Date('2026-02-07T11:00:00').getTime();
    const now = new Date().getTime();
    const distanceWeddingDate = weddingDate - now;
    const distanceVuquyDate = vuquyDate - now;
    if (distanceWeddingDate > 0) {
        const days = Math.floor(distanceWeddingDate / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distanceWeddingDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distanceWeddingDate % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distanceWeddingDate % (1000 * 60)) / 1000);
        
        const countdownText = document.getElementById('countdown-text-lecuoi');
        if (countdownText) {
            countdownText.textContent = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
        }
    }
    if(distanceVuquyDate > 0)
    {
        const days = Math.floor(distanceVuquyDate / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distanceVuquyDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distanceVuquyDate % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distanceVuquyDate % (1000 * 60)) / 1000);
        
        const countdownText = document.getElementById('countdown-text-vuquy');
        if (countdownText) {
            countdownText.textContent = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ==================== GIFT MODAL ====================
function openGiftModal(type) {
    // Hide both sections first
    qrGroomSection.classList.add('hidden');
    qrBrideSection.classList.add('hidden');
    
    // Show the appropriate section based on type
    if (type === 'groom') {
        qrGroomSection.classList.remove('hidden');
        modalTitle.textContent = 'Mừng Cưới Chú Rể';
    } else if (type === 'bride') {
        qrBrideSection.classList.remove('hidden');
        modalTitle.textContent = 'Mừng Cưới Cô Dâu';
    }
    
    giftModal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeGiftModal() {
    giftModal.classList.remove('visible');
    document.body.style.overflow = '';
}

// Groom envelope opens groom QR only
redEnvelopeGroom.addEventListener('click', () => openGiftModal('groom'));

// Bride envelope opens bride QR only
redEnvelopeBride.addEventListener('click', () => openGiftModal('bride'));

closeModalBtn.addEventListener('click', closeGiftModal);

// Close on backdrop click
giftModal.addEventListener('click', (e) => {
    if (e.target === giftModal || e.target.classList.contains('modal-backdrop')) {
        closeGiftModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeGiftModal();
        closeLightbox();
    }
});

// ==================== PHOTO LIGHTBOX ====================
// Album images array - you can add more images here
const albumImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
    'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800'
];

let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    generateThumbnails();
    photoLightbox.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    photoLightbox.classList.remove('visible');
    document.body.style.overflow = '';
}

function updateLightbox() {
    lightboxImage.src = albumImages[currentImageIndex];
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${albumImages.length}`;
    
    // Update active thumbnail
    const thumbnails = lightboxThumbnails.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === currentImageIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
    
    // Scroll thumbnail into view
    const activeThumbnail = lightboxThumbnails.querySelector('.thumbnail.active');
    if (activeThumbnail) {
        activeThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
}

function generateThumbnails() {
    lightboxThumbnails.innerHTML = '';
    albumImages.forEach((src, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${index === currentImageIndex ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${src.replace('w=800', 'w=100')}" alt="Thumbnail ${index + 1}">`;
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightbox();
        });
        lightboxThumbnails.appendChild(thumb);
    });
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % albumImages.length;
    updateLightbox();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + albumImages.length) % albumImages.length;
    updateLightbox();
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Close lightbox on backdrop click
photoLightbox.addEventListener('click', (e) => {
    if (e.target === photoLightbox || e.target.classList.contains('lightbox-backdrop')) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!photoLightbox.classList.contains('visible')) return;
    
    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
});

// Album grid click handlers
document.querySelectorAll('.album-item').forEach(item => {
    item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        openLightbox(index);
    });
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Start cover hearts immediately
    startCoverHearts();
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== PARALLAX EFFECT FOR LEAVES ====================
function initParallax() {
    const parallaxLeaves = document.querySelectorAll('.parallax-leaf');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        parallaxLeaves.forEach((leaf, index) => {
            // Get original position
            const rect = leaf.getBoundingClientRect();
            const leafTop = rect.top + scrollY;
            
            // Different speed for each leaf
            const speed = 0.08 + (index * 0.025);
            const direction = index % 2 === 0 ? 1 : -1;
            const yOffset = scrollY * speed * direction;
            const xOffset = scrollY * speed * 0.4 * direction;
            const rotation = scrollY * 0.03 * direction;
            
            // Special handling for leaf-5 (center leaf)
            if (leaf.classList.contains('leaf-5')) {
                leaf.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px)) rotate(${rotation}deg)`;
            } else {
                leaf.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`;
            }
        });
    });
}

// ==================== SMOOTH AUTO SCROLL ====================
const SCROLL_DURATION = 35000; // 35 seconds
let scrollAnimationId;

function startSmoothScroll() {
    const startPosition = 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const startTime = performance.now();
    
    function animateScroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / SCROLL_DURATION, 1);
        
        // Linear scroll - constant velocity, no easing
        const currentPosition = startPosition + (maxScroll * progress);
        
        window.scrollTo(0, currentPosition);
        
        if (progress < 1) {
            scrollAnimationId = requestAnimationFrame(animateScroll);
        }
    }
    
    scrollAnimationId = requestAnimationFrame(animateScroll);
    
    // Stop auto-scroll on user interaction
    ['wheel', 'touchstart', 'keydown'].forEach(event => {
        window.addEventListener(event, () => {
            if (scrollAnimationId) {
                cancelAnimationFrame(scrollAnimationId);
                scrollAnimationId = null;
            }
        }, { once: true, passive: true });
    });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Start cover hearts immediately
    startCoverHearts();
    
    // Initialize parallax effect
    initParallax();
});
