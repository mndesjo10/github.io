// ========================================
// SLIDESHOW FUNCTIONALITY
// ========================================
let slideIndex = 1;
showSlides(slideIndex);

let slideInterval = setInterval(() => {
    plusSlides(1);
}, 4000);

function plusSlides(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex += n);
    slideInterval = setInterval(() => plusSlides(1), 4000);
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    slideInterval = setInterval(() => plusSlides(1), 4000);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    if (!slides.length) return;

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

// ========================================
// NAVIGATION & SCROLLING
// ========================================
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 60,
            behavior: 'smooth'
        });
        updateActiveLink(sectionId);

        const navbar = document.getElementById('navbar');
        if (navbar) {
            navbar.classList.remove('show-menu');
        }
    }
}

function updateActiveLink(sectionId) {
    const navLinks = document.querySelectorAll('.Navbar a');
    navLinks.forEach(link => link.classList.remove('active'));

    const currentLink = document.querySelector(`.Navbar a[href="#${sectionId}"]`);
    if (currentLink) {
        currentLink.classList.add('active');
    }
}

function checkCurrentSection() {
    const sections = ['Home', 'About', 'GitHub', 'Contact'];
    let currentSelection = 'Home';

    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                currentSelection = sectionId;
            }
        }
    });

    updateActiveLink(currentSelection);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            element.classList.add('visible');
        }
    });
    checkCurrentSection();
}

// ========================================
// CONTACT FORM POPUP
// ========================================
function openContactForm() {
    const popup = document.getElementById('popupContactForm');
    if (popup) {
        popup.style.display = 'flex';
    }
    document.body.style.overflow = 'hidden';
}

function closeContactForm() {
    const popup = document.getElementById('popupContactForm');
    if (popup) {
        popup.style.display = 'none';
    }
    document.body.style.overflow = 'auto';
}

// ========================================
// INITIALIZATION & EVENT LISTENERS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '1';

    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbar = document.getElementById('navbar');
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('show-menu');
        });
    }

    const popupContainer = document.getElementById('popupContactForm');
    if (popupContainer) {
        popupContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                closeContactForm();
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('popupName').value.trim();
            const email = document.getElementById('popupEmail').value.trim();
            const message = document.getElementById('popupMessage').value.trim();

            if (!name || !email || !message) {
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            this.reset();
            closeContactForm();
        });
    }

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations();

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeContactForm();
        }
    });
});