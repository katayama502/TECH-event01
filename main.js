document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Parallax or "Antigravity" floating effect can be added here
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Particle Effect

    // Particle Effect
    createParticles();
});

function createParticles() {
    const canvas = document.createElement('canvas');
    canvas.classList.add('particle-canvas');
    document.getElementById('hero').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height, particles;

    const resize = () => {
        width = canvas.width = document.getElementById('hero').offsetWidth;
        height = canvas.height = document.getElementById('hero').offsetHeight;
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: Math.random() * 0.5 + 0.1,
                size: Math.random() * 2,
                opacity: Math.random()
            });
        }
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.y -= p.speed;
            if (p.y < 0) p.y = height;

            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    };
    animate();
}
