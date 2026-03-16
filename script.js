// Initialize Lucide Icons
lucide.createIcons();

// Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5 seconds loader for hero effect
});

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-links a');

mobileToggle?.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    document.body.classList.toggle('overflow-hidden');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        document.body.classList.remove('overflow-hidden');
    });
});

// Review Slider Logic
const slider = document.getElementById('reviews-slider');
const cards = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
});

prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
});

// Auto Slide Reviews
let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
}, 5000);

// Pause auto slide on hover
const sliderContainer = document.querySelector('.reviews-slider-container');
sliderContainer?.addEventListener('mouseenter', () => clearInterval(autoSlide));
sliderContainer?.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }, 5000);
});

// Smooth Scroll for anchor links with dynamic offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Antigravity Hover Effect for Service & Plan Cards
const tiltCards = document.querySelectorAll('.service-card, .plan-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
    });
});
// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Create theme hint element
const themeHint = document.createElement('div');
themeHint.className = 'theme-hint';
themeHint.innerText = 'SWITCH MODE';

// Create a wrapper for perfect centering
if (themeToggle) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    themeToggle.parentNode.insertBefore(wrapper, themeToggle);
    wrapper.appendChild(themeToggle);
    wrapper.appendChild(themeHint);
}

// Check for saved theme preference - Default is now 'dark'
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

const showHint = () => {
    themeHint.classList.add('show');
    setTimeout(() => {
        themeHint.classList.remove('show');
    }, 1200);
};

themeToggle?.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Feedback animation
    themeToggle.style.transform = 'scale(0.8)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1.1) rotate(30deg)';
    }, 100);

    // Show temporary hint
    showHint();
});

// Show hint briefly on first load to draw attention to the new feature
window.addEventListener('load', () => {
    setTimeout(showHint, 2500); // Show hint after loader finishes
});
