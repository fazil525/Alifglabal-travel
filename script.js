// Mobile navigation toggle
const mobileToggle = document.getElementById('mobile-toggle');
const nav = document.querySelector('.nav');
const header = document.getElementById('header');

mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');

    // Animate hamburger to cross (simple implementation)
    const spans = mobileToggle.querySelectorAll('span');
    if (nav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Scroll effect for header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Trigger scroll check on load in case page is refreshed while scrolled
if (window.scrollY > 50) {
    header.classList.add('scrolled');
}

// Form Submission via Google Apps Script
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission redirect

        // --- IMPORTANT: REPLACE WITH YOUR GOOGLE APPS SCRIPT URL ---
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyPYDpObYGGE754KEoLAYrgzKSvtdz3ZQ5Ifu7f8mYm_I8Z3jQMhsgRvJJhfDuju_DL/exec';

        // Display loading message
        formMessage.style.display = 'block';
        formMessage.style.backgroundColor = '#eef2ff';
        formMessage.style.color = '#4338ca';
        formMessage.innerText = 'Sending your message...';

        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(contactForm)
        })
            .then(response => {
                formMessage.style.backgroundColor = '#d1fae5';
                formMessage.style.color = '#065f46';
                formMessage.innerText = 'Thank you! Your message has been sent successfully.';
                contactForm.reset();
                submitButton.disabled = false;

                // Hide the message after a few seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                formMessage.style.backgroundColor = '#fee2e2';
                formMessage.style.color = '#991b1b';
                formMessage.innerText = 'Oops! Something went wrong. Please try again or email us directly.';
                submitButton.disabled = false;
            });
    });
}
