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

// --- DARK MODE TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;
let isDarkTheme = localStorage.getItem('theme') === 'dark';

if (isDarkTheme) {
    htmlEl.setAttribute('data-theme', 'dark');
    themeToggle.innerText = '☀️';
} else {
    themeToggle.innerText = '🌙';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        if (isDarkTheme) {
            htmlEl.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerText = '☀️';
        } else {
            htmlEl.removeAttribute('data-theme');
            localStorage.removeItem('theme');
            themeToggle.innerText = '🌙';
        }
    });
}

// --- FAQ ACCORDION ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    }
});

// --- VISA ELIGIBILITY CHECKER ---
const checkVisaBtn = document.getElementById('check-visa-btn');
const visaResult = document.getElementById('visa-result');

if (checkVisaBtn && visaResult) {
    checkVisaBtn.addEventListener('click', () => {
        const nat = document.getElementById('nationality').value;
        const dest = document.getElementById('destination').value;
        
        if (!nat || !dest) {
            visaResult.innerText = "Please select both nationality and destination.";
            visaResult.style.display = 'block';
            visaResult.style.backgroundColor = 'var(--color-bg)';
            visaResult.style.color = 'var(--color-text-main)';
            return;
        }
        
        let status = '';
        let bgColor = '';
        let color = '';
        
        if (dest === 'UAE') {
            if (['US', 'UK', 'EU', 'AU'].includes(nat)) {
                status = 'Visa on Arrival Available (30/90 Days) ✅';
                bgColor = '#d1fae5'; color = '#065f46';
            } else if (['IN'].includes(nat)) {
                status = 'Visa on Arrival (if holds US/UK/EU visa) or E-Visa Required 🛂';
                bgColor = '#fef3c7'; color = '#92400e';
            } else {
                status = 'E-Visa Required (Apply through our agency) ✈️';
                bgColor = '#fee2e2'; color = '#991b1b';
            }
        } else if (dest === 'OMAN') {
            if (['US', 'UK', 'EU', 'AU', 'IN', 'CN', 'RU'].includes(nat)) {
                status = 'Visa Free (14 Days) or E-Visa Available ✅';
                bgColor = '#d1fae5'; color = '#065f46';
            } else {
                status = 'Sponsored E-Visa Required 🛂';
                bgColor = '#fee2e2'; color = '#991b1b';
            }
        }
        
        visaResult.innerText = status;
        visaResult.style.display = 'block';
        visaResult.style.backgroundColor = bgColor;
        visaResult.style.color = color;
    });
}

// --- CURRENCY CONVERTER (Live API Integration) ---
const convertBtn = document.getElementById('convert-btn');
if (convertBtn) {
    convertBtn.addEventListener('click', async () => {
        const amount = parseFloat(document.getElementById('currency-amount').value);
        const from = document.getElementById('currency-from').value;
        const to = document.getElementById('currency-to').value;
        const resultInput = document.getElementById('currency-result');
        
        if (isNaN(amount)) return;
        
        // Show loading state
        const originalText = convertBtn.innerText;
        convertBtn.innerText = "Fetching Live Rates...";
        convertBtn.disabled = true;
        resultInput.value = "Loading...";

        try {
            // Using a free, public exchange rate API
            const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
            const data = await response.json();
            
            if(data && data.rates && data.rates[to]) {
                const rate = data.rates[to];
                const finalAmount = amount * rate;
                resultInput.value = finalAmount.toFixed(2);
            } else {
                resultInput.value = "Error fetching rate";
            }
        } catch (error) {
            console.error("Currency API Error:", error);
            resultInput.value = "Error fetching rate";
        } finally {
            convertBtn.innerText = originalText;
            convertBtn.disabled = false;
        }
    });
}

// --- PLAN YOUR TRIP MODAL (WIZARD) ---
const modal = document.getElementById('trip-modal');
const openBtns = document.querySelectorAll('#open-modal-btn, .deal-book-btn');
const closeBtn = document.querySelector('.close-modal');
const steps = document.querySelectorAll('.wizard-step');
const indicators = document.querySelectorAll('.step');
const lines = document.querySelectorAll('.step-line');
let currentStep = 0;

if (modal && closeBtn) {
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
            showStep(0);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showStep(currentStep + 1);
    });
});
document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        showStep(currentStep - 1);
    });
});

function showStep(index) {
    if (index < 0 || index >= steps.length) return;
    
    // Hide current
    if(steps[currentStep]) {
        steps[currentStep].style.display = 'none';
        steps[currentStep].classList.remove('active');
    }
    
    // Show new
    currentStep = index;
    if(steps[currentStep]) {
        steps[currentStep].style.display = 'block';
        setTimeout(() => steps[currentStep].classList.add('active'), 10);
    }
    
    // Update indicators
    indicators.forEach((ind, i) => {
        if (i <= currentStep) ind.classList.add('active');
        else ind.classList.remove('active');
    });
    
    lines.forEach((line, i) => {
        if (i < currentStep) line.classList.add('active');
        else line.classList.remove('active');
    });
}

// --- TRIP FORM SUBMISSION ---
const tripForm = document.getElementById('tripForm');
const tripFormMessage = document.getElementById('trip-form-message');

if (tripForm) {
    tripForm.addEventListener('submit', function (e) {
        e.preventDefault(); 

        const scriptURL = 'https://script.google.com/macros/s/AKfycbyPYDpObYGGE754KEoLAYrgzKSvtdz3ZQ5Ifu7f8mYm_I8Z3jQMhsgRvJJhfDuju_DL/exec';

        tripFormMessage.style.display = 'block';
        tripFormMessage.style.backgroundColor = '#eef2ff';
        tripFormMessage.style.color = '#4338ca';
        tripFormMessage.innerText = 'Sending your request...';

        const submitButton = tripForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(tripForm)
        })
            .then(response => {
                tripFormMessage.style.backgroundColor = '#d1fae5';
                tripFormMessage.style.color = '#065f46';
                tripFormMessage.innerText = 'Success! Our agents will contact you shortly.';
                tripForm.reset();
                submitButton.disabled = false;
                
                // Return to step 1
                showStep(0);

                setTimeout(() => {
                    tripFormMessage.style.display = 'none';
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 3000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                tripFormMessage.style.backgroundColor = '#fee2e2';
                tripFormMessage.style.color = '#991b1b';
                tripFormMessage.innerText = 'Oops! Something went wrong. Please try again.';
                submitButton.disabled = false;
            });
    });
}

// --- CUSTOM GOOGLE TRANSLATE DROPDOWN ---
const translateContainer = document.querySelector('.custom-translate');
const translateBtn = document.querySelector('.translate-btn');
const currentLangSpan = document.querySelector('.current-lang');
const translateOptions = document.querySelectorAll('.translate-dropdown li');

if (translateContainer && translateBtn) {
    // Toggle dropdown
    translateBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        translateContainer.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!translateContainer.contains(e.target)) {
            translateContainer.classList.remove('active');
        }
    });

    // Handle language selection
    translateOptions.forEach(option => {
        option.addEventListener('click', () => {
            const langCode = option.getAttribute('data-lang');
            
            // Update UI
            currentLangSpan.innerText = langCode.toUpperCase();
            translateContainer.classList.remove('active');
            
            // Trigger Google Translate
            const googleSelect = document.querySelector('.goog-te-combo');
            if (googleSelect) {
                googleSelect.value = langCode;
                // Dispatch native change event with bubbling
                googleSelect.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            }
        });
    });
}

// --- VIEW ALL TOURS LOGIC ---
const viewAllBtn = document.getElementById('view-all-tours-btn');
const hiddenDeals = document.querySelectorAll('.hidden-deal');

if (viewAllBtn && hiddenDeals.length > 0) {
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const isHidden = hiddenDeals[0].style.getPropertyValue('display') === 'none' || hiddenDeals[0].style.display === 'none';
        
        hiddenDeals.forEach(deal => {
            if (isHidden) {
                deal.style.setProperty('display', 'flex', 'important');
            } else {
                deal.style.setProperty('display', 'none', 'important');
            }
        });
        
        viewAllBtn.textContent = isHidden ? 'Show Less Tours' : 'View All Tours';
    });
}
