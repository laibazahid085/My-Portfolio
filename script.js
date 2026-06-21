const toggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    toggle.innerHTML = navLinks.classList.contains('show')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Typing Animation (Updated)
let typed = new Typed('#element', {
    strings: [
        "DevOps Engineer",
        "Cloud & CI/CD Enthusiast",
        "Linux & Docker Specialist",
        "Full Stack Developer"
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1200,
    loop: true
});

// Scroll to Top Button
const myBtn = document.getElementById("myBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        myBtn.style.display = "block";
    } else {
        myBtn.style.display = "none";
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
const cards = document.querySelectorAll('.skill-box, .service-card');

let lastY = 0;

const observer = new IntersectionObserver((entries) => {
    const currentY = window.scrollY;

    const scrollingDown = currentY > lastY;

    entries.forEach((entry) => {
        if (entry.isIntersecting && scrollingDown) {
            entry.target.classList.add('show');
        }
    });

    lastY = currentY;
}, {
    threshold: 0.15
});

cards.forEach(card => observer.observe(card));
