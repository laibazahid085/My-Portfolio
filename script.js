/* portfolio/js/script.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Preloader Control Loop
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 600);
        }, 400);
    });

    // 2. High-Performance Mobile Layout Panel
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Ambient Engine Metrics (Mouse Glow Tracking)
    const mouseGlow = document.getElementById('mouseGlow');
    document.addEventListener('mousemove', (e) => {
        mouseGlow.style.left = `${e.clientX}px`;
        mouseGlow.style.top = `${e.clientY}px`;
    });

    // 4. Interface State Telemetry (Sticky Nav & Scroll Progress & BackToTop)
    const header = document.querySelector('header');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgressBar.style.width = `${scrollPercent}%`;

        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        if (scrollTop > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Native Micro-Interaction Engine (Typing Simulator Layer)
    const typingElement = document.getElementById('element');
    const technicalStrings = [
        "Cloud Architectures...",
        "CI/CD Infrastructures...",
        "Microservices Ecosystems..."
    ];
    let stringIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;

    function executeTypingLoop() {
        const currentString = technicalStrings[stringIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentString.substring(0, characterIndex - 1);
            characterIndex--;
        } else {
            typingElement.textContent = currentString.substring(0, characterIndex + 1);
            characterIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && characterIndex === currentString.length) {
            typingSpeed = 2000; // Hold layout text visible
            isDeleting = true;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            stringIndex = (stringIndex + 1) % technicalStrings.length;
            typingSpeed = 400; // System recovery pause
        }

        setTimeout(executeTypingLoop, typingSpeed);
    }
    
    if(typingElement) {
        executeTypingLoop();
    }

    // 6. Intersection Observer Engine (AOS Cleanroom Architecture Alternative)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 7. Interactive Background (ParticleCanvas Node Array Simulator)
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    
    function initCanvasDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    initCanvasDimensions();
    window.addEventListener('resize', initCanvasDimensions);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(0, 242, 254, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function generateSystemNodes() {
        particlesArray = [];
        const nodeDensity = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < Math.min(nodeDensity, 75); i++) {
            particlesArray.push(new Particle());
        }
    }
    generateSystemNodes();

    function renderBackgroundGridLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(renderBackgroundGridLoop);
    }
    renderBackgroundGridLoop();

    // 8. Transmission Payload Gatekeeper (Form Validation Mechanics)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'TRANSMITTING PAYLOAD... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';

            // Clean baseline notification setup mimicking asynchronous production APIs
            setTimeout(() => {
                alert('Transmission successful. Routing complete.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.pointerEvents = 'all';
            }, 1500);
        });
    }
});