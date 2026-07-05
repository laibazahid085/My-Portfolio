// ==========================================
// 1. ENGINE ANIMATION: LIVE CLUSTER CANVAS
// ==========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const maxProximityDistance = 120; 

const mouse = {
    x: null,
    y: null,
    radius: 180
};

// Listeners tracking pointer telemetry
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        // Enforce boundary parameters loop
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Mouse proximity vector attraction adjustments
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius && mouse.x !== null) {
            if (mouse.x > this.x && this.x > 0) this.x -= 1;
            if (mouse.x < this.x && this.x < canvas.width) this.x += 1;
            if (mouse.y > this.y && this.y > 0) this.y -= 1;
            if (mouse.y < this.y && this.y < canvas.height) this.y += 1;
        }

        this.x += this.directionX * 0.7;
        this.y += this.directionY * 0.7;
        this.draw();
    }
}

function initParticles() {
    particlesArray = [];
    // Dynamic node density assignment calculation formula based on width scale
    let numberOfParticles = (canvas.width * canvas.height) / 12000;
    numberOfParticles = Math.min(numberOfParticles, 120); 

    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 1;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = i % 2 === 0 ? 'rgba(0, 243, 255, 0.25)' : 'rgba(255, 0, 127, 0.25)';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectNodes() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxProximityDistance) {
                let opacity = (1 - (distance / maxProximityDistance)) * 0.15;
                ctx.strokeStyle = `rgba(0, 243, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animateCanvasLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectNodes();
    requestAnimationFrame(animateCanvasLoop);
}

// Fire Canvas System
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
initParticles();
animateCanvasLoop();


// ==========================================
// 2. SCROLL ENGINE: STAGGERED REVEALS
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add slight structural timeout staggered offset delays dynamically
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 40); 
            // Unobserve once verified loaded
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(element => revealObserver.observe(element));


// ==========================================
// 3. UI LOGIC: MENU TOGGLES & INTERACTION
// ==========================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section, footer');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 160)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });

    // Scroll to Top action tracking view toggles
    const topBtn = document.getElementById("myBtn");
    if (document.documentElement.scrollTop > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ==========================================
// 4. TRANSMISSION LAYER: EMAILJS CONFIG
// ==========================================
emailjs.init("jLY37yNT3KWtWlHa6");

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = 'Transmitting Data... <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.style.pointerEvents = 'none';

    emailjs.sendForm("laibazahid085", "template_oxd1st8", this)
        .then(() => {
            alert("Transmission successful. System logs updated successfully!");
            this.reset();
        })
        .catch((error) => {
            alert("Failed to deliver payload transmission packet.");
            console.error(error);
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.pointerEvents = 'auto';
        });
});


// ==========================================
// 5. ENGINE INIT: TYPEWRITER TARGET DATA
// ==========================================
if (document.getElementById('element')) {
    new Typed('#element', {
        strings: ['Cloud Architectures.', 'CI/CD Automation Loops.', 'Full-Stack Infrastructures.'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
}