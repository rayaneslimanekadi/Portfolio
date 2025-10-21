// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeText = document.querySelector('.theme-text');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
themeText.textContent = currentTheme === 'dark' ? 'light' : 'dark';

themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeText.textContent = newTheme === 'dark' ? 'light' : 'dark';
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navRight = document.querySelector('.nav-right');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navRight.classList.toggle('active');

        // Simple hamburger animation
        const spans = navToggle.querySelectorAll('span');
        if (navRight.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (spans[1]) spans[1].style.opacity = '0';
        } else {
            spans[0].style.transform = 'none';
            if (spans[1]) spans[1].style.opacity = '1';
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navRight.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        if (spans[1]) spans[1].style.opacity = '1';
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    highlightNavigation();
});
