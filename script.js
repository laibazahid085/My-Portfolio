
const toggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    toggle.innerHTML = navLinks.classList.contains('show')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});
let typed = new Typed('#element', {
    strings: ['Frontend Developer.'],
    typeSpeed: 100,
});
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
