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
    themeToggle.innerText = 'â˜€ï¸';
} else {
    themeToggle.innerText = 'ðŸŒ™';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        if (isDarkTheme) {
            htmlEl.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerText = 'â˜€ï¸';
        } else {
            htmlEl.removeAttribute('data-theme');
            localStorage.removeItem('theme');
            themeToggle.innerText = 'ðŸŒ™';
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
                status = 'Visa on Arrival Available (30/90 Days) âœ…';
                bgColor = '#d1fae5'; color = '#065f46';
            } else if (['IN'].includes(nat)) {
                status = 'Visa on Arrival (if holds US/UK/EU visa) or E-Visa Required ðŸ›‚';
                bgColor = '#fef3c7'; color = '#92400e';
            } else {
                status = 'E-Visa Required (Apply through our agency) âœˆï¸';
                bgColor = '#fee2e2'; color = '#991b1b';
            }
        } else if (dest === 'OMAN') {
            if (['US', 'UK', 'EU', 'AU', 'IN', 'CN', 'RU'].includes(nat)) {
                status = 'Visa Free (14 Days) or E-Visa Available âœ…';
                bgColor = '#d1fae5'; color = '#065f46';
            } else {
                status = 'Sponsored E-Visa Required ðŸ›‚';
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

// --- LIVE WEATHER FORECAST ---
const weatherCitySelect = document.getElementById('weather-city');
const tempEl = document.getElementById('weather-temp');
const descEl = document.getElementById('weather-desc');
const humidityEl = document.getElementById('weather-humidity');
const windEl = document.getElementById('weather-wind');

const cityCoordinates = {
    // Middle East & Africa
    'dubai': { lat: 25.2048, lon: 55.2708 },
    'abu_dhabi': { lat: 24.4539, lon: 54.3773 },
    'muscat': { lat: 23.5880, lon: 58.3829 },
    'doha': { lat: 25.2854, lon: 51.5310 },
    'riyadh': { lat: 24.7136, lon: 46.6753 },
    'cairo': { lat: 30.0444, lon: 31.2357 },
    'cape_town': { lat: -33.9249, lon: 18.4241 },
    'marrakech': { lat: 31.6295, lon: -7.9811 },
    
    // Europe
    'london': { lat: 51.5074, lon: -0.1278 },
    'paris': { lat: 48.8566, lon: 2.3522 },
    'rome': { lat: 41.9028, lon: 12.4964 },
    'barcelona': { lat: 41.3851, lon: 2.1734 },
    'amsterdam': { lat: 52.3676, lon: 4.9041 },
    'istanbul': { lat: 41.0082, lon: 28.9784 },
    'athens': { lat: 37.9838, lon: 23.7275 },
    'vienna': { lat: 48.2082, lon: 16.3738 },
    'prague': { lat: 50.0755, lon: 14.4378 },
    'zurich': { lat: 47.3769, lon: 8.5417 },
    'berlin': { lat: 52.5200, lon: 13.4050 },
    
    // Asia
    'bangkok': { lat: 13.7563, lon: 100.5018 },
    'phuket': { lat: 7.8804, lon: 98.3922 },
    'tokyo': { lat: 35.6762, lon: 139.6503 },
    'kyoto': { lat: 35.0116, lon: 135.7681 },
    'singapore': { lat: 1.3521, lon: 103.8198 },
    'bali': { lat: -8.4095, lon: 115.1889 },
    'kuala_lumpur': { lat: 3.1390, lon: 101.6869 },
    'ho_chi_minh': { lat: 10.8231, lon: 106.6297 },
    'seoul': { lat: 37.5665, lon: 126.9780 },
    'male': { lat: 4.1755, lon: 73.5093 },
    'mumbai': { lat: 19.0760, lon: 72.8777 },
    
    // North America
    'new_york': { lat: 40.7128, lon: -74.0060 },
    'los_angeles': { lat: 34.0522, lon: -118.2437 },
    'miami': { lat: 25.7617, lon: -80.1918 },
    'las_vegas': { lat: 36.1699, lon: -115.1398 },
    'toronto': { lat: 43.6510, lon: -79.3470 },
    'cancun': { lat: 21.1619, lon: -86.8515 },
    
    // South America & Oceania
    'rio': { lat: -22.9068, lon: -43.1729 },
    'buenos_aires': { lat: -34.6037, lon: -58.3816 },
    'sydney': { lat: -33.8688, lon: 151.2093 },
    'auckland': { lat: -36.8485, lon: 174.7633 },
    'fiji': { lat: -17.7134, lon: 178.0650 }
};

// Transform WMO Weather codes to readable text
function getWeatherDescription(code) {
    if (code === 0) return 'Clear sky â˜€ï¸';
    if (code === 1 || code === 2 || code === 3) return 'Partly cloudy â›…';
    if (code === 45 || code === 48) return 'Foggy ðŸŒ«ï¸';
    if (code >= 51 && code <= 55) return 'Drizzle ðŸŒ§ï¸';
    if (code >= 56 && code <= 57) return 'Freezing Drizzle ðŸŒ§ï¸';
    if (code >= 61 && code <= 65) return 'Rain â˜”';
    if (code >= 66 && code <= 67) return 'Freezing Rain â˜”';
    if (code >= 71 && code <= 77) return 'Snow â„ï¸';
    if (code >= 80 && code <= 82) return 'Rain showers ðŸŒ§ï¸';
    if (code >= 95 && code <= 99) return 'Thunderstorm â›ˆï¸';
    return 'Unknown';
}

let currentLocCoords = null;

async function fetchWeather(city) {
    if (!tempEl) return;
    
    let lat, lon;
    
    if (city === 'current' && currentLocCoords) {
        lat = currentLocCoords.lat;
        lon = currentLocCoords.lon;
    } else {
        const coords = cityCoordinates[city];
        if (!coords) return;
        lat = coords.lat;
        lon = coords.lon;
    }
    
    tempEl.innerText = '...';
    descEl.innerText = 'Fetching...';
    
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data && data.current) {
            tempEl.innerText = `${Math.round(data.current.temperature_2m)}Â°C`;
            descEl.innerText = getWeatherDescription(data.current.weather_code);
            humidityEl.innerText = data.current.relative_humidity_2m;
            windEl.innerText = data.current.wind_speed_10m;
        }
    } catch (error) {
        console.error("Weather fetch error:", error);
        descEl.innerText = 'Unable to load';
    }
}

if (weatherCitySelect) {
    weatherCitySelect.addEventListener('change', (e) => {
        fetchWeather(e.target.value);
    });
    
    // Try to get location automatically on page load
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                currentLocCoords = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                // Show current location option
                const opt = document.getElementById('opt-current-loc');
                if (opt) {
                    opt.style.display = 'block';
                    weatherCitySelect.value = 'current';
                }
                fetchWeather('current');
            },
            (error) => {
                console.log("Geolocation denied or error, falling back to default.", error);
                fetchWeather(weatherCitySelect.value);
            }
        );
    } else {
        fetchWeather(weatherCitySelect.value);
    }
}

// --- LIVE TRAVEL NEWS ---
async function fetchTravelNews() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;
    
    try {
        const rssUrl = encodeURIComponent('https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml?t=' + Date.now());
        const url = 'https://api.rss2json.com/v1/api.json?rss_url=' + rssUrl;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            newsContainer.innerHTML = '';
            // Display top 3 news items
            const items = data.items.slice(0, 3);
            items.forEach(item => {
                const card = document.createElement('a');
                card.href = item.link;
                card.target = "_blank";
                card.className = "news-card";
                card.style.display = "flex";
                card.style.flexDirection = "column";
                card.style.padding = "1.5rem";
                card.style.border = "1px solid rgba(0, 108, 53, 0.1)";
                card.style.borderRadius = "12px";
                card.style.background = "var(--color-surface)";
                card.style.transition = "transform 0.3s, box-shadow 0.3s";
                card.style.textDecoration = "none";
                
                let imgUrl = item.thumbnail || (item.enclosure && item.enclosure.link);
                // Regex to find first image in content if thumbnail is missing
                if (!imgUrl || imgUrl === "") {
                    const contentStr = item.content || item.description || "";
                    const imgMatch = contentStr.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch) {
                        imgUrl = imgMatch[1];
                    } else {
                        imgUrl = "https://picsum.photos/seed/travel/400/200"; // Fake generic image
                    }
                }
                
                const dateObj = new Date(item.pubDate);
                const dateStr = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                
                // Clean desc
                let desc = (item.description || item.content || '').replace(/<[^>]+>/g, '').substring(0, 90) + '...';
                
                card.innerHTML = `
                    <div style="height:150px; background: url('${imgUrl}') center/cover; border-radius: 8px; margin-bottom: 1rem;"></div>
                    <div style="font-size: 0.8rem; color: var(--color-accent); font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase;">ðŸ“… ${dateStr}</div>
                    <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--color-secondary); line-height: 1.3;">${item.title}</h4>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5; margin-bottom: 0;">${desc}</p>
                `;
                
                card.addEventListener('mouseenter', () => {
                    card.style.transform = "translateY(-5px)";
                    card.style.boxShadow = "var(--shadow-md)";
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = "none";
                    card.style.boxShadow = "none";
                });
                
                newsContainer.appendChild(card);
            });
        } else {
            newsContainer.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--color-text-muted);">Currently no news available.</div>';
        }
    } catch (e) {
        console.error("News fetch error", e);
        newsContainer.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#ef4444;">Error loading travel news.</div>';
    }
}

fetchTravelNews();

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

