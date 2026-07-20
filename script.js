// ============================================
// LOADING SPINNER
// ============================================
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hide');
    }, 1000);
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============================================
// ACTIVE NAV LINK
// ============================================
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById('themeToggle');

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    if (document.body.classList.contains('light-mode')) {
        this.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        this.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ============================================
// SCROLL TO SECTION
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const sectionPosition = section.offsetTop - navHeight - 20;
        window.scrollTo({
            top: sectionPosition,
            behavior: 'smooth'
        });
    }
}

// ============================================
// MEMBERSHIP FORM VALIDATION
// ============================================
const form = document.getElementById('membershipForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    document.querySelectorAll('.form-group input, .form-group select').forEach(el => {
        el.classList.remove('error');
    });
    
    // Validate Full Name
    const name = document.getElementById('fullName');
    if (name.value.trim().length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
        name.classList.add('error');
        isValid = false;
    }
    
    // Validate Age
    const age = document.getElementById('age');
    if (age.value < 10 || age.value > 100) {
        showError('ageError', 'Age must be between 10 and 100');
        age.classList.add('error');
        isValid = false;
    }
    
    // Validate Gender
    const gender = document.getElementById('gender');
    if (gender.value === '') {
        showError('genderError', 'Please select your gender');
        gender.classList.add('error');
        isValid = false;
    }
    
    // Validate Phone
    const phone = document.getElementById('phone');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.value)) {
        showError('phoneError', 'Please enter a valid 10-digit phone number');
        phone.classList.add('error');
        isValid = false;
    }
    
    // Validate Email (optional)
    const email = document.getElementById('email');
    if (email.value && !email.value.includes('@')) {
        showError('emailError', 'Please enter a valid email address');
        email.classList.add('error');
        isValid = false;
    }
    
    // Validate Membership Plan
    const plan = document.getElementById('membershipPlan');
    if (plan.value === '') {
        showError('planError', 'Please select a membership plan');
        plan.classList.add('error');
        isValid = false;
    }
    
    // Validate Terms
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        showError('termsError', 'You must agree to the Terms & Conditions');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        form.style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';
        
        // Animation for success
        document.querySelector('.success-message i').style.animation = 'none';
        setTimeout(() => {
            document.querySelector('.success-message i').style.animation = 'fadeIn 0.5s ease';
        }, 10);
        
        // Reset button state
        const submitBtn = document.querySelector('.btn-submit');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
    }
});

function showError(id, message) {
    const errorEl = document.getElementById(id);
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

function resetForm() {
    form.reset();
    form.style.display = 'block';
    document.getElementById('successMessage').style.display = 'none';
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    document.querySelectorAll('.form-group input, .form-group select').forEach(el => {
        el.classList.remove('error');
    });
    window.scrollTo({
        top: document.getElementById('membership').offsetTop - 100,
        behavior: 'smooth'
    });
}

// ============================================
// REAL-TIME VALIDATION
// ============================================
document.querySelectorAll('.form-group input, .form-group select').forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        validateField(this);
    });
});

function validateField(field) {
    const errorId = field.id + 'Error';
    const errorEl = document.getElementById(errorId);
    
    if (!errorEl) return;
    
    switch(field.id) {
        case 'fullName':
            if (field.value && field.value.trim().length < 3) {
                showError(errorId, 'Name must be at least 3 characters');
                field.classList.add('error');
            } else if (field.value) {
                errorEl.classList.remove('show');
                field.classList.remove('error');
            }
            break;
            
        case 'age':
            if (field.value && (field.value < 10 || field.value > 100)) {
                showError(errorId, 'Age must be between 10 and 100');
                field.classList.add('error');
            } else if (field.value) {
                errorEl.classList.remove('show');
                field.classList.remove('error');
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[0-9]{10}$/;
            if (field.value && !phoneRegex.test(field.value)) {
                showError(errorId, 'Enter a valid 10-digit phone number');
                field.classList.add('error');
            } else if (field.value) {
                errorEl.classList.remove('show');
                field.classList.remove('error');
            }
            break;
            
        case 'email':
            if (field.value && !field.value.includes('@')) {
                showError(errorId, 'Enter a valid email address');
                field.classList.add('error');
            } else if (field.value) {
                errorEl.classList.remove('show');
                field.classList.remove('error');
            }
            break;
            
        case 'gender':
        case 'membershipPlan':
            if (field.value && field.value !== '') {
                errorEl.classList.remove('show');
                field.classList.remove('error');
            }
            break;
    }
}

// ============================================
// TERMS & CONDITIONS
// ============================================
function showTerms() {
    alert(
        '📋 Terms & Conditions\n\n' +
        '1. Membership is non-transferable\n' +
        '2. Proper gym attire required\n' +
        '3. Equipment must be used properly\n' +
        '4. Management reserves all rights\n' +
        '5. Cancellation requires 30-day notice'
    );
}

// ============================================
// PLAN SELECTION
// ============================================
function selectPlan(plan) {
    // Scroll to membership form
    scrollToSection('membership');
    
    // Select the plan in dropdown
    const planSelect = document.getElementById('membershipPlan');
    const planMap = {
        'Basic': 'basic',
        'Premium': 'premium',
        'Gold': 'gold'
    };
    planSelect.value = planMap[plan];
    
    // Highlight the selected plan
    document.querySelectorAll('.plan-card').forEach(card => {
        card.style.borderColor = 'rgba(255,255,255,0.1)';
    });
    const selectedCard = document.querySelector(`.plan-card[data-plan="${planMap[plan]}"]`);
    if (selectedCard) {
        selectedCard.style.borderColor = '#FF8C00';
    }
    
    // Show notification
    showNotification(`Selected ${plan} plan! Fill the form below.`);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.custom-notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;color:white;font-size:1.2rem;cursor:pointer;">&times;</button>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: 1rem;
        border: 2px solid #FF8C00;
        box-shadow: 0 8px 30px rgba(0,0,0,0.5);
        animation: slideUp 0.3s ease;
        max-width: 90%;
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function openMembershipModal() {
    const modal = document.getElementById('membershipModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeMembershipModal() {
    const modal = document.getElementById('membershipModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
document.getElementById('membershipModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMembershipModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeMembershipModal();
    }
});

// ============================================
// CALL US FUNCTION
// ============================================
function callUs() {
    if (confirm('Call Raj Fitness Gym at +91 98765 43210?')) {
        window.location.href = 'tel:+919876543210';
    }
}

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            scrollToSection(targetId.substring(1));
        }
    });
});

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        scrollToSection('home');
    }
    if (e.ctrlKey && e.key === 'm') {
        e.preventDefault();
        openMembershipModal();
    }
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c💪 Raj Fitness Gym', 'font-size: 2rem; font-weight: bold; color: #FF8C00;');
console.log('%cTransform Your Life Today!', 'font-size: 1.2rem; color: #fff;');
console.log('%cJoin us for the best fitness experience', 'font-size: 1rem; color: #888;');

// ============================================
// PERFORMANCE OPTIMIZATION - LAZY LOADING
// ============================================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================
let chatOpen = false;

function toggleChatbot() {
    const winEl = document.getElementById('chatWindow');
    if (!winEl) return;

    // Make it idempotent: update state only if class actually changes
    const isOpen = winEl.classList.contains('open');
    if (isOpen) {
        winEl.classList.remove('open');
        chatOpen = false;
        return;
    }

    winEl.classList.add('open');
    chatOpen = true;

    // Scroll after next paint to avoid flicker
    requestAnimationFrame(() => {
        const msgs = document.getElementById('chatMessages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
    });
}


function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    setTimeout(() => {
        addMessage('🤔 Let me check that for you...', 'bot');
    }, 500);
    
    setTimeout(() => {
        const response = getBotResponse(message.toLowerCase());
        const messages = document.getElementById('chatMessages');
        const lastMsg = messages.lastElementChild;
        if (lastMsg && lastMsg.textContent.includes('Let me check')) {
            lastMsg.remove();
        }
        addMessage(response, 'bot');
    }, 1500);
}

function addMessage(text, sender) {
    const messages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.innerHTML = text;
    
    const time = document.createElement('span');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    msgDiv.appendChild(bubble);
    msgDiv.appendChild(time);
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

function sendQuickReply(text) {
    document.getElementById('chatInput').value = text;
    sendMessage();
}

function getBotResponse(message) {
    const responses = {
        'plan': 'We offer 3 membership plans:\n💰 Basic - ₹999/month\n💎 Premium - ₹1999/month\n👑 Gold - ₹2999/month\n\nWhich plan interests you?',
        'timing': '🏋️ We are open 5:00 AM to 11:00 PM, 7 days a week! Come anytime that suits you.',
        'trainer': '💪 We have 10+ certified trainers. Book a session today! Click "Join Now" to get started.',
        'contact': '📞 Call us: +91 98765 43210\n📧 Email: info@rajgym.com\n📍 Address: 123 Fitness Street, City',
        'price': 'Our pricing:\nBasic: ₹999/month\nPremium: ₹1999/month\nGold: ₹2999/month\n\nSpecial discounts for 6-month and yearly memberships!',
        'discount': '🎉 Yes! We offer:\n• 10% off on 6-month membership\n• 20% off on yearly membership\n• Student discount: 15% off',
        'facility': '🏆 Our facilities include:\n• Modern equipment\n• Locker rooms\n• Yoga studio\n• Cardio area\n• Free weights zone\n• Personal training',
        'location': '📍 We are located at:\n123 Fitness Street, City, State - 123456\n\nFind us on Google Maps!',
        'hello': '👋 Hello! Welcome to Raj Fitness Gym. How can I assist you today?',
        'thank': '😊 You\'re welcome! Stay fit and healthy! 💪',
        'default': 'I understand you\'re asking about that. Let me connect you with our team for more details.\n\nMeanwhile, feel free to:\n• Check our membership plans\n• Call us directly\n• Visit our gym'
    };
    
    for (const [key, value] of Object.entries(responses)) {
        if (message.includes(key)) {
            return value;
        }
    }
    
    return responses.default;
}

// ============================================
// LIVE MEMBER COUNTER (backend-driven)
// ============================================
async function loadActiveMembersToday() {
    try {
        const token = getAuthToken();
        const el = document.getElementById('memberCount');
        if (!el) return;

        // If not logged in, show 0 (or you can change to a public endpoint)
        if (!token) {
            el.textContent = '0';
            return;
        }

        // Backend returns { count }
        const data = await apiFetch('/api/me/active-members-today', { method: 'GET', token });
        el.textContent = Number(data?.count ?? 0).toLocaleString();
    } catch (e) {
        console.error('Failed to load active members today:', e);
        const el = document.getElementById('memberCount');
        if (el) el.textContent = '0';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try { loadActiveMembersToday(); } catch {}
});


// ============================================
// PROGRESS BAR ANIMATION
// ============================================
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress-fill');
            fills.forEach(fill => {
                const width = fill.getAttribute('data-width') || '50';
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 200);
            });
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.progress-container').forEach(el => {
    progressObserver.observe(el);
});

// ============================================
// TESTIMONIAL SLIDER
// ============================================
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalSlides = testimonialCards.length;

const dotsContainer = document.getElementById('testimonialDots');
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.onclick = () => goToSlide(i);
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
}

function slideTestimonial(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateTestimonial();
}

function goToSlide(index) {
    currentSlide = index;
    updateTestimonial();
}

function updateTestimonial() {
    const track = document.getElementById('testimonialTrack');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.testimonial-dots span').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

setInterval(() => slideTestimonial(1), 5000);

// ============================================
// WORKOUT GENERATOR
// ============================================
const workouts = {
    beginner: {
        fullbody: [
            { name: "Jumping Jacks", sets: "3 x 30 sec", rest: "30 sec" },
            { name: "Bodyweight Squats", sets: "3 x 15", rest: "45 sec" },
            { name: "Push-ups (Knee)", sets: "3 x 10", rest: "45 sec" },
            { name: "Plank", sets: "3 x 30 sec", rest: "30 sec" },
            { name: "Lunges", sets: "3 x 12 each", rest: "45 sec" }
        ],
        upper: [
            { name: "Push-ups", sets: "3 x 12", rest: "45 sec" },
            { name: "Dumbbell Rows", sets: "3 x 15", rest: "45 sec" },
            { name: "Shoulder Press", sets: "3 x 12", rest: "45 sec" },
            { name: "Bicep Curls", sets: "3 x 15", rest: "30 sec" },
            { name: "Tricep Dips", sets: "3 x 12", rest: "30 sec" }
        ],
        lower: [
            { name: "Squats", sets: "3 x 15", rest: "45 sec" },
            { name: "Lunges", sets: "3 x 12 each", rest: "45 sec" },
            { name: "Glute Bridges", sets: "3 x 15", rest: "30 sec" },
            { name: "Calf Raises", sets: "3 x 20", rest: "30 sec" },
            { name: "Leg Press", sets: "3 x 12", rest: "45 sec" }
        ],
        cardio: [
            { name: "Jump Rope", sets: "3 x 1 min", rest: "30 sec" },
            { name: "High Knees", sets: "3 x 45 sec", rest: "30 sec" },
            { name: "Burpees", sets: "3 x 10", rest: "45 sec" },
            { name: "Mountain Climbers", sets: "3 x 30 sec", rest: "30 sec" },
            { name: "Squat Jumps", sets: "3 x 12", rest: "45 sec" }
        ]
    },
    intermediate: {
        fullbody: [
            { name: "Burpees", sets: "4 x 12", rest: "30 sec" },
            { name: "Pull-ups", sets: "4 x 8", rest: "45 sec" },
            { name: "Goblet Squats", sets: "4 x 12", rest: "45 sec" },
            { name: "Dumbbell Press", sets: "4 x 10", rest: "45 sec" },
            { name: "Russian Twists", sets: "4 x 20", rest: "30 sec" }
        ],
        upper: [
            { name: "Bench Press", sets: "4 x 10", rest: "60 sec" },
            { name: "Pull-ups", sets: "4 x 8", rest: "60 sec" },
            { name: "Shoulder Press", sets: "4 x 10", rest: "45 sec" },
            { name: "Bent Over Rows", sets: "4 x 12", rest: "45 sec" },
            { name: "Dips", sets: "4 x 10", rest: "45 sec" }
        ],
        lower: [
            { name: "Barbell Squats", sets: "4 x 10", rest: "60 sec" },
            { name: "Deadlifts", sets: "4 x 8", rest: "60 sec" },
            { name: "Walking Lunges", sets: "4 x 12", rest: "45 sec" },
            { name: "Leg Curls", sets: "4 x 12", rest: "45 sec" },
            { name: "Calf Raises", sets: "4 x 15", rest: "30 sec" }
        ],
        cardio: [
            { name: "Box Jumps", sets: "4 x 15", rest: "30 sec" },
            { name: "Battleropes", sets: "4 x 45 sec", rest: "30 sec" },
            { name: "Kettlebell Swings", sets: "4 x 15", rest: "30 sec" },
            { name: "Medicine Ball Slams", sets: "4 x 12", rest: "30 sec" },
            { name: "Sled Push", sets: "4 x 20m", rest: "45 sec" }
        ]
    },
    advanced: {
        fullbody: [
            { name: "CrossFit WOD", sets: "5 x 15", rest: "20 sec" },
            { name: "Muscle-ups", sets: "5 x 5", rest: "45 sec" },
            { name: "Pistol Squats", sets: "5 x 8 each", rest: "45 sec" },
            { name: "Handstand Push-ups", sets: "5 x 6", rest: "45 sec" },
            { name: "Turkish Get-ups", sets: "5 x 5", rest: "45 sec" }
        ],
        upper: [
            { name: "Weighted Pull-ups", sets: "5 x 6", rest: "60 sec" },
            { name: "Heavy Bench Press", sets: "5 x 5", rest: "90 sec" },
            { name: "Arnold Press", sets: "4 x 8", rest: "45 sec" },
            { name: "T-Bar Rows", sets: "4 x 8", rest: "45 sec" },
            { name: "Skull Crushers", sets: "4 x 10", rest: "45 sec" }
        ],
        lower: [
            { name: "Back Squats", sets: "5 x 5", rest: "90 sec" },
            { name: "Deadlifts", sets: "5 x 3", rest: "90 sec" },
            { name: "Bulgarian Splits", sets: "4 x 10 each", rest: "45 sec" },
            { name: "Romanian Deadlifts", sets: "4 x 8", rest: "45 sec" },
            { name: "Box Jumps", sets: "5 x 10", rest: "30 sec" }
        ],
        cardio: [
            { name: "Tabata Sprints", sets: "8 x 20 sec", rest: "10 sec" },
            { name: "Rowing Machine", sets: "5 x 250m", rest: "30 sec" },
            { name: "Assault Bike", sets: "5 x 30 sec", rest: "15 sec" },
            { name: "Farmers Walk", sets: "5 x 50m", rest: "30 sec" },
            { name: "Skipping Rope", sets: "5 x 2 min", rest: "30 sec" }
        ]
    }
};

// ============================================
// FEATURES: Progress Save + My Workouts + Trainer Booking
// ============================================
const STORAGE_KEYS = {
    progress: (email) => `rajGym_progress_${email}`,
    workouts: (email) => `rajGym_workouts_${email}`,
    bookings: (email) => `rajGym_trainerBookings_${email}`
};

function getLoggedUserEmail() {
    try {
        const u = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
        return u?.email || null;
    } catch {
        return null;
    }
}

function clampPercent(n) {
    const x = Number(n);
    if (Number.isNaN(x)) return 0;
    return Math.min(100, Math.max(0, Math.round(x)));
}

function getDefaultProgress() {
    return { strength: 75, cardio: 60, flexibility: 45, nutrition: 80 };
}

function renderProgress(progress) {
    if (!progress) return;
    const s = clampPercent(progress.strength);
    const c = clampPercent(progress.cardio);
    const f = clampPercent(progress.flexibility);
    const n = clampPercent(progress.nutrition);

    document.getElementById('progressStrengthText').textContent = `${s}%`;
    document.getElementById('progressCardioText').textContent = `${c}%`;
    document.getElementById('progressFlexText').textContent = `${f}%`;
    document.getElementById('progressNutritionText').textContent = `${n}%`;

    document.getElementById('progressStrengthFill').style.width = `${s}%`;
    document.getElementById('progressCardioFill').style.width = `${c}%`;
    document.getElementById('progressFlexFill').style.width = `${f}%`;
    document.getElementById('progressNutritionFill').style.width = `${n}%`;

    document.getElementById('strengthInput').value = s;
    document.getElementById('cardioInput').value = c;
    document.getElementById('flexInput').value = f;
    document.getElementById('nutritionInput').value = n;
}

async function loadProgress() {
    const token = getAuthToken();
    if (token) {
        try {
            const row = await apiFetch('/api/me/progress');
            renderProgress({ ...getDefaultProgress(), ...(row || {}) });
            return;
        } catch (e) {
            console.error(e);
            // fall back to local
        }
    }

    const email = getLoggedUserEmail();
    if (!email) return;

    const raw = localStorage.getItem(STORAGE_KEYS.progress(email));
    const parsed = raw ? JSON.parse(raw) : null;
    renderProgress({ ...getDefaultProgress(), ...(parsed || {}) });
}

async function saveProgress() {
    const token = getAuthToken();
    if (token) {
        try {
            const progress = {
                strength: clampPercent(document.getElementById('strengthInput').value),
                cardio: clampPercent(document.getElementById('cardioInput').value),
                flexibility: clampPercent(document.getElementById('flexInput').value),
                nutrition: clampPercent(document.getElementById('nutritionInput').value)
            };
            await apiFetch('/api/me/progress', { method: 'PUT', body: progress });
            renderProgress(progress);
            const msg = document.getElementById('progressSavedMsg');
            if (msg) {
                msg.textContent = '✅ Progress saved successfully!';
                msg.style.display = 'block';
                setTimeout(() => (msg.style.display = 'none'), 2500);
            }
            // Badge hook: Consistency streak (progress save)
            try { updateConsistencyStreak(); if (progress) awardBadge('consistencyStreak'); } catch {}
            return;
        } catch (e) {
            console.error(e);
            // fall back to local
        }
    }

    
    const email = getLoggedUserEmail();
    if (!email) {
        showNotification('⚠️ Please login to save progress.');
        return;
    }

    const progress = {
        strength: clampPercent(document.getElementById('strengthInput').value),
        cardio: clampPercent(document.getElementById('cardioInput').value),
        flexibility: clampPercent(document.getElementById('flexInput').value),
        nutrition: clampPercent(document.getElementById('nutritionInput').value)
    };

localStorage.setItem(STORAGE_KEYS.progress(email), JSON.stringify(progress));
    renderProgress(progress);

    // Badge hook: Consistency streak (progress save)
    try { updateConsistencyStreak(); if (progress) awardBadge('consistencyStreak'); } catch {}


    const msg = document.getElementById('progressSavedMsg');
    if (msg) {
        msg.textContent = '✅ Progress saved successfully!';
        msg.style.display = 'block';
        setTimeout(() => (msg.style.display = 'none'), 2500);
    }
}

async function resetProgress() {
    // Reset server-side progress if logged in via backend token.
    const token = getAuthToken();
    if (token) {
        try {
            const d = getDefaultProgress();
            await apiFetch('/api/me/progress', { method: 'PUT', body: d });
            renderProgress(d);
            const msg = document.getElementById('progressSavedMsg');
            if (msg) {
                msg.textContent = '✅ Progress reset successfully!';
                msg.style.display = 'block';
                setTimeout(() => (msg.style.display = 'none'), 2500);
            }
            return;
        } catch (e) {
            console.error(e);
        }
    }

    
    renderProgress(getDefaultProgress());
    const email = getLoggedUserEmail();
    if (email) localStorage.removeItem(STORAGE_KEYS.progress(email));
}

// workouts
function getMyWorkouts() {
    // TODO: keep My Workouts as local-only; backend integration covers workout logs.
    // This prevents breaking UI while still moving calendar persistence to backend.
    
    const email = getLoggedUserEmail();
    if (!email) return [];
    const raw = localStorage.getItem(STORAGE_KEYS.workouts(email));
    return raw ? JSON.parse(raw) : [];
}

function setMyWorkouts(workoutsArr) {
    const email = getLoggedUserEmail();
    if (!email) return;
    localStorage.setItem(STORAGE_KEYS.workouts(email), JSON.stringify(workoutsArr));
}

function renderMyWorkouts(list) {
    const empty = document.getElementById('myWorkoutsEmpty');
    const container = document.getElementById('myWorkoutsList');

    if (!container || !empty) return;

    container.innerHTML = '';

    if (!list || list.length === 0) {
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';

    list.forEach(w => {
        const card = document.createElement('div');
        card.className = 'saved-workout-card';
        card.innerHTML = `
            <div class="saved-workout-top">
                <div>
                    <h3>${w.title}</h3>
                    <small>${new Date(w.createdAt).toLocaleString()}</small>
                </div>
                <div class="saved-workout-actions">
                    <button class="saved-workout-btn" onclick="loadWorkoutToGenerator(${w.id})">Load</button>
                    <button class="saved-workout-btn danger" onclick="deleteWorkout(${w.id})">Delete</button>
                </div>
            </div>
            <ul class="saved-workout-exercises"></ul>
        `;

        const ul = card.querySelector('.saved-workout-exercises');
        (w.exercises || []).forEach(ex => {
            const li = document.createElement('li');
            li.textContent = `${ex.name} — ${ex.sets} (Rest: ${ex.rest})`;
            ul.appendChild(li);
        });

        container.appendChild(card);
    });
}

function loadMyWorkoutsUI() {
    const email = getLoggedUserEmail();
    if (!email) {
        renderMyWorkouts([]);
        return;
    }
    renderMyWorkouts(getMyWorkouts());
}

function saveWorkout() {
    const email = getLoggedUserEmail();
    if (!email) {
        showNotification('⚠️ Please login to save workouts.');
        return;
    }
    if (!lastGeneratedWorkout) {
        showNotification('⚠️ Generate a workout first.');
        return;
    }

    const levelNames = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
    const focusNames = { fullbody: 'Full Body', upper: 'Upper Body', lower: 'Lower Body', cardio: 'Cardio' };

    const w = {
        ...lastGeneratedWorkout,
        id: lastGeneratedWorkout.id,
        createdAt: lastGeneratedWorkout.createdAt,
        title: `${levelNames[lastGeneratedWorkout.level]} - ${focusNames[lastGeneratedWorkout.focus]} (${lastGeneratedWorkout.duration} min)`
    };

    const arr = getMyWorkouts();
    arr.unshift(w);
    setMyWorkouts(arr.slice(0, 50));
    loadMyWorkoutsUI();
    showNotification('✅ Workout saved to My Workouts');

    // Badge unlock hook
    try {
        const st = readBadgesState();
        if (st && !st.awarded.firstWorkoutSaved) awardBadge('firstWorkoutSaved');
    } catch {}
}


function deleteWorkout(id) {
    const arr = getMyWorkouts();
    const next = arr.filter(w => w.id !== id);
    setMyWorkouts(next);
    loadMyWorkoutsUI();
    showNotification('🗑️ Workout deleted');
}

function clearMyWorkouts() {
    const email = getLoggedUserEmail();
    if (!email) return;
    if (!confirm('Clear all saved workouts?')) return;
    localStorage.removeItem(STORAGE_KEYS.workouts(email));
    loadMyWorkoutsUI();
}

function loadWorkoutToGenerator(id) {
    const list = getMyWorkouts();
    const w = list.find(x => x.id === id);
    if (!w) return;

    document.getElementById('workoutLevel').value = w.level;
    document.getElementById('workoutFocus').value = w.focus;
    document.getElementById('workoutDuration').value = String(w.duration);

    const resultDiv = document.getElementById('workoutResult');
    const exercisesList = document.getElementById('workoutExercises');
    const timeDisplay = document.getElementById('workoutTime');
    const titleDisplay = document.getElementById('workoutTitle');

    exercisesList.innerHTML = '';
    (w.exercises || []).forEach(exercise => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${exercise.name}</span>
            <div>
                <span class="exercise-sets">${exercise.sets}</span>
                <span class="exercise-rest"> | Rest: ${exercise.rest}</span>
            </div>
        `;
        exercisesList.appendChild(li);
    });

    const levelNames = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
    const focusNames = { fullbody: 'Full Body', upper: 'Upper Body', lower: 'Lower Body', cardio: 'Cardio' };
    titleDisplay.textContent = `🔥 ${levelNames[w.level]} - ${focusNames[w.focus]} Workout`;
    timeDisplay.textContent = `⏱️ ${w.duration} Minutes`;

    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

    lastGeneratedWorkout = { id: Date.now(), createdAt: new Date().toISOString(), level: w.level, focus: w.focus, duration: w.duration, exercises: w.exercises };
}

function exportMyWorkouts() {
    const email = getLoggedUserEmail();
    if (!email) {
        showNotification('⚠️ Please login to export workouts.');
        return;
    }
    const list = getMyWorkouts();
    const data = JSON.stringify(list, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raj-gym-workouts-${email}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// trainer bookings (MongoDB backed)
async function fetchTrainerBookings() {
    const token = getAuthToken();
    if (!token) return [];
    const data = await apiFetch('/api/me/trainer-bookings', { method: 'GET', token });
    return data?.rows || [];
}

function renderTrainerBookingCard(b) {
    const card = document.createElement('div');
    card.className = 'trainer-booking-card';
    card.innerHTML = `
        <div class="trainer-booking-row">
            <div>
                <h3>${b.name}</h3>
                <small>${b.phone} • ${new Date(b.createdAt).toLocaleString()}</small>
                <div class="trainer-booking-meta">Goal: ${b.goalLabel}</div>
                <div class="trainer-booking-meta">Slot: ${b.slotLabel || b.subSlotLabel || ''}</div>
            </div>
            <button class="saved-workout-btn danger" onclick="deleteBooking('${b._id}')">Cancel</button>
        </div>
    `;
    return card;
}

async function renderTrainerBookings() {
    const list = document.getElementById('trainerBookingsList');
    const empty = document.getElementById('trainerBookingsEmpty');
    if (!list || !empty) return;

    list.innerHTML = '';

    try {
        const bookings = await fetchTrainerBookings();

        if (!bookings || bookings.length === 0) {
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';
        bookings.forEach(b => list.appendChild(renderTrainerBookingCard(b)));
    } catch (e) {
        console.error(e);
        empty.style.display = 'block';
    }
}

async function deleteBooking(id) {
    const token = getAuthToken();
    if (!token) {
        showNotification('⚠️ Please login');
        return;
    }

    try {
        await apiFetch(`/api/me/trainer-bookings/${id}`, { method: 'DELETE', token });
        showNotification('Booking canceled');
        await renderTrainerBookings();
    } catch (e) {
        showNotification('❌ Failed to cancel booking');
    }
}

function getSlotMeta(slot) {
    const parts = String(slot).split('_');
    const period = parts[0];
    const start = parts[1];
    const end = parts[2];

    const periodLabel =
        period === 'morning' ? 'Morning (6-9 AM)' :
        period === 'afternoon' ? 'Afternoon (12-3 PM)' :
        period === 'evening' ? 'Evening (5-8 PM)' :
        period;

    const startH = Number(start);
    const endH = Number(end);

    const toAmPm = (h) => {
        if (h === 0) return { h12: 12, suffix: 'AM' };
        if (h >= 12) return { h12: h === 12 ? 12 : h - 12, suffix: 'PM' };
        return { h12: h, suffix: 'AM' };
    };

    const s = toAmPm(startH);
    const e = toAmPm(endH);

    const subSlotLabel = `${String(startH).padStart(2,'0')}:00 - ${String(endH).padStart(2,'0')}:00`;

    return {
        period,
        startH,
        endH,
        periodLabel,
        subSlotId: slot,
        subSlotLabel: `${s.h12}:00 ${s.suffix} - ${e.h12}:00 ${e.suffix}`,
        slotLabel: `${periodLabel} • ${s.h12}:00 ${s.suffix} - ${e.h12}:00 ${e.suffix}`
    };
}

async function bookTrainer() {
    const token = getAuthToken();
    if (!token) {
        showNotification('⚠️ Please login to book a trainer.');
        return;
    }

    const name = document.getElementById('bookingName').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();
    const goal = document.getElementById('bookingGoal').value;
    const slot = document.getElementById('bookingSlot').value;

    const phoneRegex = /^[0-9]{10}$/;
    if (!name || name.length < 2) return showNotification('⚠️ Enter your name');
    if (!phoneRegex.test(phone)) return showNotification('⚠️ Enter valid 10-digit phone');
    if (!goal) return showNotification('⚠️ Select goal');
    if (!slot) return showNotification('⚠️ Select slot');

    const goalMap = {
        'fat-loss': 'Fat Loss',
        'muscle-gain': 'Muscle Gain',
        'strength': 'Strength',
        'flexibility': 'Flexibility'
    };

    const slotMeta = getSlotMeta(slot);

    try {
        const payload = {
            name,
            phone,
            goal,
            goalLabel: goalMap[goal] || goal,
            subSlotId: slotMeta.subSlotId,
            subSlotLabel: slotMeta.subSlotLabel,
            slotLabel: slotMeta.slotLabel
        };

        await apiFetch('/api/me/trainer-bookings', { method: 'POST', token, body: payload });

        const msg = document.getElementById('bookingMsg');
        if (msg) {
            msg.textContent = '✅ Trainer booking successful!';
            msg.style.display = 'block';
            setTimeout(() => (msg.style.display = 'none'), 2500);
        }

        await renderTrainerBookings();

        // Badge unlock hook
        try {
            const st = readBadgesState();
            if (st && !st.awarded.trainerBookingDone) awardBadge('trainerBookingDone');
        } catch {}
    } catch (e) {
        console.error(e);
        showNotification(String(e.message || e));
    }
}




function initSavedFeatures() {
    // progress defaults + load saved
    const progressStrengthText = document.getElementById('progressStrengthText');
    if (progressStrengthText) {
        renderProgress(getDefaultProgress());
        loadProgress();
    }

    // workouts UI
    const myWorkouts = document.getElementById('myWorkouts');
    if (myWorkouts) loadMyWorkoutsUI();

    // bookings UI
    const trainerList = document.getElementById('trainerBookingsList');
    if (trainerList) {
        const currentName = document.getElementById('bookingName');
        const currentPhone = document.getElementById('bookingPhone');
        const u = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
        if (u) {
            if (currentName) currentName.value = u.name || '';
            if (currentPhone) currentPhone.value = u.phone || '';
        }
        renderTrainerBookings();
    }
}

function maybeInitOnAuth() {
    initSavedFeatures();
}

function generateWorkout() {
    const level = document.getElementById('workoutLevel').value;

    const focus = document.getElementById('workoutFocus').value;
    const duration = document.getElementById('workoutDuration').value;

    
    const workoutData = workouts[level][focus];
    const resultDiv = document.getElementById('workoutResult');
    const exercisesList = document.getElementById('workoutExercises');
    const timeDisplay = document.getElementById('workoutTime');
    const titleDisplay = document.getElementById('workoutTitle');
    
    exercisesList.innerHTML = '';
    
    const levelNames = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
    const focusNames = { fullbody: 'Full Body', upper: 'Upper Body', lower: 'Lower Body', cardio: 'Cardio' };
    titleDisplay.textContent = `🔥 ${levelNames[level]} - ${focusNames[focus]} Workout`;
    
    timeDisplay.textContent = `⏱️ ${duration} Minutes`;
    
    workoutData.forEach(exercise => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${exercise.name}</span>
            <div>
                <span class="exercise-sets">${exercise.sets}</span>
                <span class="exercise-rest"> | Rest: ${exercise.rest}</span>
            </div>
        `;
        exercisesList.appendChild(li);
    });
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    showNotification('💪 Workout generated successfully! Get ready to sweat!');

    // store last generated for Save Workout button
    lastGeneratedWorkout = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        level,
        focus,
        duration: Number(duration),
        exercises: workoutData
    };
}


let lastGeneratedWorkout = null;

function startWorkoutTimer() {
    const duration = document.getElementById('workoutDuration').value;
    showNotification(`⏱️ Workout timer started for ${duration} minutes!`);
}

// ================================
// INTERVAL TIMER (upgrade)
// ================================
let intervalTimer = null;
let intervalRunning = false;
let intervalStage = 'warmup';
let intervalRoundsDone = 0;

function formatMMSS(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function playBeepSoundSoft() {
    // reuse existing beep (calls playBeepSound if present)
    try {
        if (typeof playBeepSound === 'function') playBeepSound();
    } catch {}
}

function getIntervalSettings() {
    const getNum = (id, fallback) => {
        const el = document.getElementById(id);
        if (!el) return fallback;
        const v = parseInt(el.value, 10);
        return Number.isFinite(v) ? v : fallback;
    };

    // inputs are interpreted as seconds for interval mode
    return {
        warmupSec: getNum('intervalWarmupSec', 60),
        workSec: getNum('intervalWorkSec', 30),
        restSec: getNum('intervalRestSec', 15),
        rounds: getNum('intervalRounds', 8)
    };
}

function ensureIntervalUIVisible() {
    // if user hasn't added new interval UI yet, we don't break existing countdown
    const el = document.getElementById('intervalMode');
    if (el && el.value === '1') return true;
    return false;
}

function startIntervalTimer() {
    // interval inputs might not exist in current HTML; guard.
    const warmupInput = document.getElementById('intervalWarmupSec');
    const workInput = document.getElementById('intervalWorkSec');
    const roundsInput = document.getElementById('intervalRounds');
    if (!warmupInput || !workInput || !roundsInput) {
        showNotification('⚠️ Interval settings UI not found in this page yet.');
        return;
    }

    if (intervalRunning) return;

    const { warmupSec, workSec, restSec, rounds } = getIntervalSettings();
    if (warmupSec <= 0 || workSec <= 0 || restSec < 0 || rounds <= 0) {
        showNotification('⚠️ Please enter valid interval values.');
        return;
    }

    // Stop normal countdown if running
    try {
        if (typeof timerInterval !== 'undefined' && timerInterval) clearInterval(timerInterval);
    } catch {}

    intervalRunning = true;
    intervalRoundsDone = 0;

    intervalStage = 'warmup';
    let stageRemaining = warmupSec;

    const timerStatus = document.getElementById('timerStatus');
    timerStatus && (timerStatus.textContent = '🔥 Warmup');

    document.getElementById('timerMinutes').textContent = String(Math.floor(stageRemaining / 60)).padStart(2, '0');
    document.getElementById('timerSeconds').textContent = String(stageRemaining % 60).padStart(2, '0');

    if (document.getElementById('timerStartBtn')) {
        document.getElementById('timerStartBtn').style.display = 'none';
    }
    if (document.getElementById('timerPauseBtn')) {
        document.getElementById('timerPauseBtn').style.display = 'inline-flex';
    }

    intervalTimer = setInterval(() => {
        stageRemaining--;

        const mins = Math.floor(stageRemaining / 60);
        const secs = stageRemaining % 60;
        document.getElementById('timerMinutes').textContent = String(mins).padStart(2, '0');
        document.getElementById('timerSeconds').textContent = String(secs).padStart(2, '0');

        if (stageRemaining <= 0) {
            // stage transition
            playBeepSoundSoft();

            if (intervalStage === 'warmup') {
                intervalStage = 'work';
                timerStatus && (timerStatus.textContent = '💪 Work');
                stageRemaining = workSec;
                return;
            }

            if (intervalStage === 'work') {
                intervalStage = 'rest';
                timerStatus && (timerStatus.textContent = '⏸️ Rest');
                stageRemaining = restSec;
                return;
            }

            // rest finished -> either next round work or complete
            if (intervalStage === 'rest') {
                intervalRoundsDone++;
                if (intervalRoundsDone >= rounds) {
                    clearInterval(intervalTimer);
                    intervalRunning = false;
                    timerStatus && (timerStatus.textContent = "🏁 Interval complete!");
                    document.getElementById('timerStartBtn')?.style && (document.getElementById('timerStartBtn').style.display = 'inline-flex');
                    document.getElementById('timerPauseBtn')?.style && (document.getElementById('timerPauseBtn').style.display = 'none');
                    showNotification('🏁 Interval workout complete!');
                    playBeepSoundSoft();
                    return;
                }

                intervalStage = 'work';
                timerStatus && (timerStatus.textContent = `💪 Work (Round ${intervalRoundsDone + 1}/${rounds})`);
                stageRemaining = workSec;
                return;
            }
        }
    }, 1000);

    showNotification(`⏱️ Interval timer started: Warmup ${Math.round(warmupSec / 60)}m, Work ${workSec}s, Rest ${restSec}s, Rounds ${rounds}`);
}

function pauseIntervalTimer() {
    if (!intervalRunning || !intervalTimer) return;
    clearInterval(intervalTimer);
    intervalRunning = false;
    showNotification('⏸️ Interval paused');
}

function resetIntervalTimer() {
    if (intervalTimer) clearInterval(intervalTimer);
    intervalTimer = null;
    intervalRunning = false;
    intervalStage = 'warmup';
    intervalRoundsDone = 0;
    document.getElementById('timerStatus').textContent = '';
}

// ================================
// PHASE 1: Diet Planner + Weekly Routine + Badges
// ================================


const PHASE1_STORAGE = {
    diet: (email) => `rajGym_diet_${email}`,
    routine: (email) => `rajGym_routine_${email}`,
    badges: (email) => `rajGym_badges_${email}`,
    streak: (email) => `rajGym_streak_${email}`
};

function getEmailOrNull() {
    return getLoggedUserEmail();
}

function getDefaultBadgesState() {
    return {
        firstWorkoutSaved: false,
        trainerBookingDone: false,
        consistencyStreak: 0,
        awarded: {
            firstWorkoutSaved: false,
            trainerBookingDone: false,
            consistencyStreak: false
        }
    };
}

function readBadgesState() {
    const email = getEmailOrNull();
    if (!email) return null;
    const raw = localStorage.getItem(PHASE1_STORAGE.badges(email));
    if (!raw) return getDefaultBadgesState();
    try {
        return JSON.parse(raw);
    } catch {
        return getDefaultBadgesState();
    }
}

function writeBadgesState(state) {
    const email = getEmailOrNull();
    if (!email) return;
    localStorage.setItem(PHASE1_STORAGE.badges(email), JSON.stringify(state));
}

function computeBadgeScore(state) {
    if (!state) return 0;
    let score = 0;
    if (state.awarded.firstWorkoutSaved) score += 120;
    if (state.awarded.trainerBookingDone) score += 120;
    if (state.awarded.consistencyStreak) score += Math.min(400, state.consistencyStreak * 20);
    return score;
}

function renderBadgesUI() {
    const state = readBadgesState();
    const badgeList = document.getElementById('badgeList');
    const badgeScore = document.getElementById('badgeScore');
    if (!badgeList || !badgeScore) return;

    if (!state) {
        badgeScore.textContent = '0';
        badgeList.innerHTML = '<div class="my-workouts-empty">⚠️ Login to see your badges.</div>';
        return;
    }

    const items = [
        { key: 'firstWorkoutSaved', name: 'First Workout Saved', desc: 'Save your first workout' },
        { key: 'trainerBookingDone', name: 'Trainer Booking Done', desc: 'Book your first trainer' },
        { key: 'consistencyStreak', name: 'Consistency Streak', desc: 'Save progress 3+ days in a row' }
    ];

    badgeList.innerHTML = '';
    items.forEach(it => {
        const on = !!state.awarded[it.key];
        const scoreHint = it.key === 'consistencyStreak' ? `${state.consistencyStreak} days streak` : 'Unlocked';
        const el = document.createElement('div');
        el.className = 'badge-item';
        el.innerHTML = `
            <div class="badge-left">
                <div class="badge-name">${it.name}</div>
                <div class="badge-desc">${it.desc}</div>
            </div>
            <div class="badge-awarded ${on ? 'on' : ''}">${on ? '✅ ' + scoreHint : '🔒 Locked'}</div>
        `;
        badgeList.appendChild(el);
    });

    badgeScore.textContent = String(computeBadgeScore(state));
}

function awardBadge(key) {
    const state = readBadgesState();
    if (!state) return;
    if (!state.awarded[key]) {
        state.awarded[key] = true;
        writeBadgesState(state);
        renderBadgesUI();
        showNotification(`🏆 Badge unlocked: ${key}`);
    } else {
        renderBadgesUI();
    }
}

function updateConsistencyStreak() {
    const email = getEmailOrNull();
    if (!email) return;

    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const d = today.getDate();
    const todayKey = `${y}-${m + 1}-${d}`;

    const streakRaw = localStorage.getItem(PHASE1_STORAGE.streak(email));
    let streakState = { lastDateKey: null, streak: 0, todayDone: null };
    if (streakRaw) {
        try { streakState = JSON.parse(streakRaw); } catch {}
    }

    if (streakState.todayDone === todayKey) return;

    const last = streakState.lastDateKey;
    if (!last) {
        streakState.streak = 1;
    } else {
        const [yy, mm, dd] = last.split('-').map(Number);
        const lastDate = new Date(yy, mm - 1, dd);
        const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24));
        streakState.streak = diffDays === 1 ? streakState.streak + 1 : 1;
    }

    streakState.lastDateKey = todayKey;
    streakState.todayDone = todayKey;

    localStorage.setItem(PHASE1_STORAGE.streak(email), JSON.stringify(streakState));

    const badges = readBadgesState();
    if (badges) {
        badges.consistencyStreak = streakState.streak;
        if (streakState.streak >= 3) badges.awarded.consistencyStreak = true;
        writeBadgesState(badges);
    }

    renderBadgesUI();
}

function initPhase1UI() {
    renderBadgesUI();
    // init routine/diet render is optional (keeps page light)
}

// ===== Diet generator =====
const DIET_TEMPLATES = {
    'fat-loss': {
        vegetarian: {
            low: { calories: 1600, macros: 'High Protein • Moderate Carbs • Low Fat' },
            normal: { calories: 1900, macros: 'Balanced • Lean Protein Focus' },
            high: { calories: 2200, macros: 'Slight Carb Increase • Strength support' }
        },
        'non-veg': {
            low: { calories: 1700, macros: 'High Protein • Low Carb' },
            normal: { calories: 2000, macros: 'Balanced • Lean Protein' },
            high: { calories: 2300, macros: 'Higher Energy • Strength support' }
        }
    },
    'muscle-gain': {
        vegetarian: {
            low: { calories: 1900, macros: 'Protein + Complex Carbs' },
            normal: { calories: 2300, macros: 'Lean Bulk • Muscle building' },
            high: { calories: 2700, macros: 'High Energy • Training support' }
        },
        'non-veg': {
            low: { calories: 2100, macros: 'Protein + Carbs for recovery' },
            normal: { calories: 2500, macros: 'Lean Bulk • Muscle building' },
            high: { calories: 2900, macros: 'High Energy • Heavy training' }
        }
    }
};

function buildDietDay(dayIndex, goal, dietType) {
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const vegMeals = [
        { b: 'Oats + Greek Yogurt + Berries', l: 'Chole / Rajma + Brown Rice', d: 'Paneer Tikka + Veg Sabzi', s: 'Fruit + Nuts' },
        { b: 'Veg Upma + Curd', l: 'Moong Dal + Roti', d: 'Mixed Veg + Tofu', s: 'Sprouts Salad' },
        { b: 'Poha + Protein Shake', l: 'Sambar + Idli', d: 'Grilled Veg Sandwich (whole wheat)', s: 'Dates + Milk' },
        { b: 'Eggless Protein Smoothie', l: 'Rajma + Quinoa', d: 'Veg Stir Fry + Soya', s: 'Greek Yogurt' },
        { b: 'Besan Cheela + Curd', l: 'Lentil Soup + Roti', d: 'Paneer + Roasted Veg', s: 'Banana + Peanut Butter' },
        { b: 'Cottage Cheese + Fruit', l: 'Chana + Rice', d: 'Veg Bowl (rice + salad)', s: 'Roasted Chana' },
        { b: 'Moong Dal Khichdi', l: 'Dal + Roti', d: 'Paneer / Tofu + Sabzi', s: 'Protein Shake' }
    ];

    const nonVegMeals = [
        { b: 'Oats + Skim Milk + Banana', l: 'Chicken / Moong Dal + Brown Rice', d: 'Grilled Chicken + Salad', s: 'Curd + Nuts' },
        { b: 'Egg Omelette + Toast', l: 'Fish / Lentil Bowl + Roti', d: 'Chicken Stir Fry + Veg', s: 'Greek Yogurt' },
        { b: 'Protein Smoothie + Fruits', l: 'Chicken Curry + Rice', d: 'Tandoori Chicken + Salad', s: 'Dates + Milk' },
        { b: 'Egg Bhurji + Bread', l: 'Dal + Chicken + Roti', d: 'Fish Bowl + Salad', s: 'Sprouts Salad' },
        { b: 'Yogurt + Granola + Berries', l: 'Chicken + Quinoa', d: 'Grilled Chicken + Veg', s: 'Nuts + Fruit' },
        { b: 'Oats + Whey + Banana', l: 'Lentil Soup + Chicken', d: 'Chicken Wrap (whole wheat)', s: 'Curd' },
        { b: 'Moong Dal + Protein Shake', l: 'Fish + Rice', d: 'Grilled Chicken + Sabzi', s: 'Roasted Chana' }
    ];

    const meals = dietType === 'vegetarian' ? vegMeals : nonVegMeals;
    const base = meals[dayIndex % meals.length];
    const proteinBoost = goal === 'fat-loss' ? ' (extra protein)' : ' (recovery support)';

    return {
        day: dayNames[dayIndex],
        breakfast: base.b + proteinBoost,
        lunch: base.l,
        dinner: base.d,
        snacks: base.s
    };
}

function generateDietPlan() {
    const goal = document.getElementById('dietGoal').value;
    const dietType = document.getElementById('dietType').value;
    const calLevel = document.getElementById('dietCalories').value;

    const tpl = DIET_TEMPLATES[goal]?.[dietType]?.[calLevel] || DIET_TEMPLATES[goal]?.[dietType]?.normal;
    const calories = tpl?.calories || 2100;
    const macros = tpl?.macros || 'Balanced macros';

    const title = `${goal === 'fat-loss' ? 'Fat Loss' : 'Muscle Gain'} • ${dietType === 'vegetarian' ? 'Vegetarian' : 'Non-Veg'} • ${calLevel} calories (${calories} kcal)`;

    const plan = [];
    for (let i = 0; i < 7; i++) plan.push(buildDietDay(i, goal, dietType));

    document.getElementById('dietTitle').textContent = '🔥 Your Diet Plan';
    document.getElementById('dietMacrosHint').textContent = `${title} | ${macros}`;

    const grid = document.getElementById('dietPlanGrid');
    if (grid) {
        grid.innerHTML = '';
        plan.forEach(day => {
            const card = document.createElement('div');
            card.className = 'diet-day-card';
            card.innerHTML = `
                <div class="diet-day-title">${day.day}</div>
                <div class="diet-meal"><b>Breakfast:</b> ${day.breakfast}</div>
                <div class="diet-meal"><b>Lunch:</b> ${day.lunch}</div>
                <div class="diet-meal"><b>Dinner:</b> ${day.dinner}</div>
                <div class="diet-meal"><b>Snacks:</b> ${day.snacks}</div>
            `;
            grid.appendChild(card);
        });
    }

    if (document.getElementById('dietResult')) document.getElementById('dietResult').style.display = 'block';
    window.__lastGeneratedDiet = { goal, dietType, calLevel, calories, macros, days: plan };
}

function saveDietPlan() {
    const email = getEmailOrNull();
    if (!email) {
        showNotification('⚠️ Please login to save diet plan.');
        return;
    }
    const diet = window.__lastGeneratedDiet;
    if (!diet) {
        showNotification('⚠️ Generate a diet plan first.');
        return;
    }

    localStorage.setItem(
        PHASE1_STORAGE.diet(email),
        JSON.stringify({ ...diet, savedAt: new Date().toISOString() })
    );

    const msg = document.getElementById('dietSavedMsg');
    if (msg) {
        msg.style.display = 'block';
        setTimeout(() => (msg.style.display = 'none'), 2500);
    }
    showNotification('✅ Diet plan saved');
}

function clearDietPlan() {
    window.__lastGeneratedDiet = null;
    const grid = document.getElementById('dietPlanGrid');
    if (grid) grid.innerHTML = '';
    const res = document.getElementById('dietResult');
    if (res) res.style.display = 'none';
}

// ===== Routine generator / tracking =====
const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function routineWorkoutForFocus(focus, idx) {
    if (focus === 'upper') {
        return ['Push Day', 'Pull Day', 'Shoulders + Arms', 'Chest + Back', 'Arms + Core', 'Upper Mix', 'Rest + Mobility'][idx];
    }
    if (focus === 'lower') {
        return ['Legs (Squat)', 'Hamstrings (RDL)', 'Calves + Core', 'Quads + Glutes', 'Deadlift Pattern', 'Lower Mix', 'Rest + Mobility'][idx];
    }
    return ['Full Body A', 'Full Body B', 'Full Body C', 'Full Body D', 'Full Body E', 'Conditioning + Core', 'Rest + Mobility'][idx];
}

function generateWeeklyRoutine() {
    const daysPerWeek = parseInt(document.getElementById('routineDays').value, 10);
    const focus = document.getElementById('routineFocus').value;

    const chosen = new Set();
    let cursor = 0;
    while (chosen.size < daysPerWeek) {
        chosen.add(cursor % 7);
        cursor += Math.ceil(7 / daysPerWeek);
    }

    const routineDays = DAY_ORDER.map((day, idx) => {
        const workout = routineWorkoutForFocus(focus, idx);
        return {
            key: `d${idx}`,
            day,
            workout,
            done: false,
            active: chosen.has(idx)
        };
    });

    document.getElementById('routineTitle').textContent = `🔥 ${focus.toUpperCase()} Weekly Routine`;
    document.getElementById('routineMeta').textContent = `${daysPerWeek} days/week • ${new Date().toLocaleDateString()}`;

    const list = document.getElementById('routineDaysList');
    if (list) {
        list.innerHTML = '';
        routineDays.forEach(day => {
            const item = document.createElement('div');
            item.className = 'routine-day-item';
            item.innerHTML = `
                <div class="routine-day-top">
                    <div class="routine-day-name">${day.day}</div>
                    <div class="routine-day-workout">${day.active ? day.workout : 'Rest Day'}</div>
                </div>
                <label class="routine-checkbox" style="opacity:${day.active ? 1 : 0.55};">
                    <input type="checkbox" data-daykey="${day.key}" ${day.done ? 'checked' : ''} ${day.active ? '' : 'disabled'} onchange="saveRoutineTracking()" />
                    Done
                </label>
            `;
            list.appendChild(item);
        });
    }

    const res = document.getElementById('routineResult');
    if (res) res.style.display = 'block';
    window.__lastGeneratedRoutine = { focus, daysPerWeek, days: routineDays, weekStart: new Date().toISOString() };
}

function startRoutineTracking() {
    const res = document.getElementById('routineResult');
    if (res) res.style.display = 'block';
    if (!window.__lastGeneratedRoutine) showNotification('⚠️ Generate routine first.');
}

function getRoutineFromUI() {
    const email = getEmailOrNull();
    if (!email) return null;

    const keys = ['d0','d1','d2','d3','d4','d5','d6'];
    const days = DAY_ORDER.map((dayName, idx) => {
        const key = keys[idx];
        const input = document.querySelector(`#routineDaysList input[data-daykey="${key}"]`);
        const done = !!input?.checked;
        const active = !!input && !input.disabled;
        const item = document.querySelector(`#routineDaysList .routine-day-item:nth-child(${idx + 1})`);
        const workoutEl = item ? item.querySelector('.routine-day-workout') : null;
        const workoutText = workoutEl ? workoutEl.textContent : '';
        return { key, day: dayName, workout: workoutText, done, active };
    });

    return { email, days };
}

function saveRoutineTracking() {
    const email = getEmailOrNull();
    if (!email) {
        showNotification('⚠️ Please login to save routine.');
        return;
    }

    const payload = getRoutineFromUI();
    if (!payload) {
        showNotification('⚠️ Generate routine first.');
        return;
    }

    const last = window.__lastGeneratedRoutine || {};
    const data = {
        focus: last.focus || document.getElementById('routineFocus')?.value || 'fullbody',
        daysPerWeek: last.daysPerWeek || parseInt(document.getElementById('routineDays')?.value || '5', 10),
        days: payload.days,
        savedAt: new Date().toISOString()
    };

    localStorage.setItem(PHASE1_STORAGE.routine(email), JSON.stringify(data));

    const msg = document.getElementById('routineSavedMsg');
    if (msg) {
        msg.style.display = 'block';
        setTimeout(() => (msg.style.display = 'none'), 2500);
    }
}

function resetRoutineTracking() {
    const email = getEmailOrNull();
    if (!email) {
        showNotification('⚠️ Login required.');
        return;
    }

    localStorage.removeItem(PHASE1_STORAGE.routine(email));

    document.querySelectorAll('#routineDaysList input[type="checkbox"]').forEach(inp => {
        if (!inp.disabled) inp.checked = false;
    });

    const msg = document.getElementById('routineSavedMsg');
    if (msg) {
        msg.style.display = 'block';
        setTimeout(() => (msg.style.display = 'none'), 2500);
    }
}

// ===== Hook phase-1 init on load =====
document.addEventListener('DOMContentLoaded', () => {
    try { initPhase1UI(); } catch {}
});

// ============================================
// BMI CALCULATOR
// ============================================
function calculateBMI() {
    const height = parseFloat(document.getElementById('bmiHeight').value);
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    
    if (!height || !weight || height < 50 || weight < 10) {
        showNotification('⚠️ Please enter valid height and weight!');
        return;
    }
    
    const heightM = height / 100;
    const bmi = weight / (heightM * heightM);
    const resultDiv = document.getElementById('bmiResult');
    
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    
    let status, color, position;
    if (bmi < 18.5) {
        status = 'Underweight';
        color = '#4FC3F7';
        position = 20;
    } else if (bmi < 25) {
        status = 'Normal';
        color = '#4CAF50';
        position = 45;
    } else if (bmi < 30) {
        status = 'Overweight';
        color = '#FF8C00';
        position = 70;
    } else {
        status = 'Obese';
        color = '#ff4444';
        position = 90;
    }
    
    const statusEl = document.getElementById('bmiStatus');
    statusEl.textContent = status;
    statusEl.style.background = color;
    statusEl.style.color = '#ffffff';
    
    document.getElementById('bmiScaleFill').style.width = Math.min(position, 100) + '%';
    
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    showNotification(`📊 Your BMI is ${bmi.toFixed(1)} - ${status}`);
}

// ============================================
// COUNTDOWN TIMER
// ============================================
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

function startTimer() {
    if (timerRunning) return;
    
    const minutes = parseInt(document.getElementById('timerInput').value) || 5;
    timerSeconds = minutes * 60;
    
    if (timerSeconds <= 0) {
        showNotification('⚠️ Please enter a valid time!');
        return;
    }
    
    timerRunning = true;
    document.getElementById('timerStartBtn').style.display = 'none';
    document.getElementById('timerPauseBtn').style.display = 'inline-flex';
    document.getElementById('timerStatus').textContent = '⏳ Timer Running...';
    document.getElementById('timerStatus').style.color = '#4CAF50';
    
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();
        
        if (timerSeconds <= 0) {
            clearInterval(timerInterval);
            timerRunning = false;
            document.getElementById('timerStartBtn').style.display = 'inline-flex';
            document.getElementById('timerPauseBtn').style.display = 'none';
            document.getElementById('timerStatus').textContent = '⏰ Time\'s Up! Great job!';
            document.getElementById('timerStatus').style.color = '#ff4444';
            showNotification('⏰ Time\'s Up! Great workout!');
            playBeepSound();
        }
    }, 1000);
}

function pauseTimer() {
    if (!timerRunning) return;
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timerStartBtn').style.display = 'inline-flex';
    document.getElementById('timerStartBtn').innerHTML = '<i class="fas fa-play"></i> Resume';
    document.getElementById('timerPauseBtn').style.display = 'none';
    document.getElementById('timerStatus').textContent = '⏸️ Paused';
    document.getElementById('timerStatus').style.color = '#FF8C00';
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    timerSeconds = 0;
    document.getElementById('timerStartBtn').style.display = 'inline-flex';
    document.getElementById('timerStartBtn').innerHTML = '<i class="fas fa-play"></i> Start';
    document.getElementById('timerPauseBtn').style.display = 'none';
    document.getElementById('timerStatus').textContent = '';
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    document.getElementById('timerMinutes').textContent = String(mins).padStart(2, '0');
    document.getElementById('timerSeconds').textContent = String(secs).padStart(2, '0');
}

function playBeepSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 880;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        setTimeout(() => oscillator.stop(), 300);
        
        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            osc2.frequency.value = 660;
            osc2.type = 'sine';
            gain2.gain.value = 0.3;
            osc2.start();
            setTimeout(() => osc2.stop(), 300);
        }, 400);
    } catch(e) {
        console.log('Beep sound not supported');
    }
}

// ============================================
// DAILY MOTIVATIONAL QUOTE
// ============================================
const quotes = [
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Success starts with self-discipline.", author: "Arnold Schwarzenegger" },
    { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi" },
    { text: "Push yourself because no one else is going to do it for you.", author: "Unknown" },
    { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
    { text: "Great things come from hard work and perseverance.", author: "Kobe Bryant" },
    { text: "Don't limit your challenges. Challenge your limits.", author: "Unknown" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Your body can stand almost anything. It's your mind you have to convince.", author: "Unknown" },
    { text: "Dream big. Work hard. Stay focused.", author: "Unknown" },
    { text: "The best time to start was yesterday. The next best time is now.", author: "Unknown" },
    { text: "Fitness is not about being better than someone else. It's about being better than you used to be.", author: "Unknown" },
    { text: "Sweat is fat crying.", author: "Unknown" },
    { text: "Make your body a machine that can't be stopped.", author: "Unknown" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" }
];

function loadDailyQuote() {
    const today = new Date().getDate();
    const index = today % quotes.length;
    const quote = quotes[index];
    document.getElementById('dailyQuote').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
}

function refreshQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('dailyQuote').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `- ${quote.author}`;
}

loadDailyQuote();

// ============================================
// FAQ ACCORDION
// ============================================
function toggleFaq(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
    });
    
    if (!isActive) {
        item.classList.add('active');
    }
}

// ============================================
// NEWSLETTER SIGNUP
// ============================================
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    const message = document.getElementById('newsletterMessage');
    
    if (email && email.includes('@')) {
        message.textContent = '✅ Thank you for subscribing! Check your inbox.';
        message.style.color = '#4CAF50';
        this.reset();
        showNotification('📧 Subscribed successfully! Welcome to Raj Gym family!');
    } else {
        message.textContent = '⚠️ Please enter a valid email address.';
        message.style.color = '#ff4444';
    }
});

// ============================================
// AUTH SYSTEM - LOGIN / SIGNUP WITH TOGGLE
// ============================================

let currentUser = null;

// Check if user is logged in

function checkAuth() {
    const token = getAuthToken();
    const savedUser = localStorage.getItem('loggedInUser');

    // If token exists but user missing, try backend fetch instead of clearing immediately.
    if (token && !savedUser) {
        fetchMeAndRender();
        return false;
    }

    if (token && savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showLoggedInUser(currentUser);

            // background refresh from backend (for latest image/details)
            fetchMeAndRender();
            return true;
        } catch {
            clearAuthToken();
        }
    }

    return false;
}

async function fetchMeAndRender() {
    const token = getAuthToken();
    if (!token) return;

    try {
        const me = await apiFetch('/api/me/me', { method: 'GET', token });
        const merged = {
            id: me.id,
            name: me.name,
            email: me.email,
            phone: me.phone,
            joinedAt: me.joinedAt
        };

        localStorage.setItem('loggedInUser', JSON.stringify(merged));

        if (me.profileImageUrl) {
            localStorage.setItem('profileImage', me.profileImageUrl);
        }

        showLoggedInUser(merged);

        // also refresh other widgets that depend on login
        try { initSavedFeatures(); } catch {}
    } catch (e) {
        // If backend auth fails, keep UI consistent by clearing token.
        // (This fixes “click but no response” when token is dummy.)
        clearAuthToken();
    }
}

// Show logged in user UI
function showLoggedInUser(user) {
    document.getElementById('userSection').style.display = 'none';
    document.getElementById('userLoggedIn').style.display = 'block';
    document.getElementById('userNameDisplay').textContent = user?.name || 'User';
    document.getElementById('dropdownUserName').textContent = user?.name || 'User';
    document.getElementById('dropdownUserEmail').textContent = user?.email || 'user@email.com';

    const defaultAvatar = 'images/default-avatar.png';
    const savedImage = localStorage.getItem('profileImage');
    const imgToUse = savedImage || defaultAvatar;

    document.getElementById('userProfileImage').src = imgToUse;
    document.getElementById('dropdownProfileImage').src = imgToUse;
}


// ============================================
// AUTH TOGGLE MODE
// ============================================

function toggleAuthMode() {
    const toggle = document.getElementById('authToggle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginLabel = document.getElementById('toggleLoginLabel');
    const signupLabel = document.getElementById('toggleSignupLabel');

    if (toggle.checked) {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        loginLabel.classList.remove('active');
        signupLabel.classList.add('active');
        document.getElementById('loginForm').reset();
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        signupLabel.classList.remove('active');
        loginLabel.classList.add('active');
        document.getElementById('signupForm').reset();
        document.getElementById('strengthBar').innerHTML = '';
        document.getElementById('strengthText').textContent = 'Weak';
        document.getElementById('strengthText').style.color = 'var(--gray)';
    }
}

// Open Auth Modal
function openAuthModal() {
    try {
        const modal = document.getElementById('authModal');
        const toggle = document.getElementById('authToggle');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        // If any required element missing, don't crash.
        if (!modal || !toggle || !loginForm || !signupForm) {
            console.warn('openAuthModal: missing elements', { modal, toggle, loginForm, signupForm });
            alert('Login popup open nahi ho raha (page elements missing). Please refresh.');
            return;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        toggle.checked = false; // default login mode
        // toggleAuthMode() may also touch DOM, so wrap it.
        try { toggleAuthMode(); } catch (e) { console.error('toggleAuthMode failed', e); }
    } catch (e) {
        console.error('openAuthModal failed:', e);
        alert('Login popup open nahi ho raha. Console me error check karein.');
    }
}

// Close Auth Modal
function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
    });
    document.getElementById('strengthBar').innerHTML = '';
    document.getElementById('strengthText').textContent = 'Weak';
    document.getElementById('strengthText').style.color = 'var(--gray)';
}

// Toggle Password Visibility
function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Password Strength Check
document.getElementById('signupPassword')?.addEventListener('input', function() {
    const password = this.value;
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    const strengthLevels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    const colors = ['#ff4444', '#ff6b6b', '#ffa500', '#4CAF50', '#00C853'];
    
    const index = Math.min(strength, 4);
    strengthBar.innerHTML = `<div class="fill" style="width:${(index + 1) * 20}%;background:${colors[index]};"></div>`;
    strengthText.textContent = strengthLevels[index];
    strengthText.style.color = colors[index];
});

// Login User
const API_BASE_URL = window.API_BASE_URL || 'http://127.0.0.1:4000';

// ============================================
// FIREBASE AUTH (Google/Gmail + Email/Phone)
// ============================================
const firebaseConfig = {
    apiKey: "AIzaSyDor7sGH6b8jd-0aHvYM4YyzS92EtEjzfU",
    authDomain: "gymweb-14be0.firebaseapp.com",
    projectId: "gymweb-14be0",
    storageBucket: "gymweb-14be0.firebasestorage.app",
    messagingSenderId: "65408424127",
    appId: "1:65408424127:web:20cb010f215566b11c4e0a",
    measurementId: "G-QSYR26LJ6X"
};

let _firebaseApp = null;
function getFirebaseApp() {
    if (window.firebase && !window.firebase.apps?.length) {
        window.firebase.initializeApp(firebaseConfig);
    }
    if (!window.firebase) return null;
    _firebaseApp = window.firebase.app();
    return _firebaseApp;
}

function getFirebaseAuth() {
    if (!window.firebase) return null;
    const app = getFirebaseApp();
    if (!app) return null;
    return window.firebase.auth(app);
}

async function firebaseSignInWithEmail(email, password) {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase auth SDK not loaded');
    const cred = await auth.signInWithEmailAndPassword(email, password);
    return cred;
}

async function firebaseSignUpWithEmail(name, email, password, phone) {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error('Firebase auth SDK not loaded');
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    if (cred?.user) {
        // Store displayName/phone if provided
        if (name) await cred.user.updateProfile({ displayName: name });
        if (phone) {
            // phone number linking requires phone auth flow; we only store it here client-side.
            // Backend keeps phone as provided during first signup call.
        }
    }
    return cred;
}

async function firebaseGetIdToken(user) {
    if (!user) return null;
    const tok = await user.getIdToken();
    return tok;
}

async function backendFirebaseLogin({ idToken, name, phone }) {
    const data = await apiFetch('/api/auth/firebase-login', {
        method: 'POST',
        body: { idToken, name: name || '', phone: phone || '' },
        token: null
    });

    if (data?.token) setAuthToken(data.token);
    if (data?.user) {
        currentUser = data.user;
        localStorage.setItem('loggedInUser', JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone || '',
            joinedAt: data.user.joinedAt
        }));
        showLoggedInUser(JSON.parse(localStorage.getItem('loggedInUser')));
    }
    return data;
}


function getAuthToken() {
    return localStorage.getItem('token');
}

function setAuthToken(token) {
    if (token) localStorage.setItem('token', token);
}

function clearAuthToken() {
    localStorage.removeItem('token');
}

async function apiFetch(path, { method = 'GET', token = null, body = null } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    const useToken = token || getAuthToken();
    if (useToken) headers.Authorization = `Bearer ${useToken}`;

    const res = await fetch(`${API_BASE_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    let data = null;
    try { data = await res.json(); } catch {}

    if (!res.ok) {
        const msg = data?.error || data?.message || `Request failed (${res.status})`;
        throw new Error(msg);
    }

    return data;
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const remember = document.getElementById('rememberMe').checked;

    if (!email || !password) {
        showNotification('⚠️ Please fill all fields!');
        return;
    }

    try {
        // Firebase email/password login
        const tokenResult = await firebaseSignInWithEmail(email, password);
        const idToken = await firebaseGetIdToken(tokenResult.user);

        // Send to backend for verification + JWT session
        const data = await apiFetch('/api/auth/firebase-login', {
            method: 'POST',
            body: { idToken },
            token: null
        });

        if (data?.token) setAuthToken(data.token);
        if (data?.user) {
            currentUser = data.user;
            localStorage.setItem('loggedInUser', JSON.stringify({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                phone: data.user.phone || '',
                joinedAt: data.user.joinedAt
            }));
            showLoggedInUser(JSON.parse(localStorage.getItem('loggedInUser')));
        }

        if (remember) localStorage.setItem('rememberMe', email);
        closeAuthModal();
        showNotification('✅ Welcome back!');

        try { initSavedFeatures(); } catch {}
    } catch (e) {
        const msg = String(e?.message || e);
        showNotification(`❌ Login failed: ${msg}`);
    }
}




// Signup User
async function signupUser() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const terms = document.getElementById('authTerms').checked;

    if (!name || !email || !password || !confirm) {
        showNotification('⚠️ Please fill all required fields!');
        return;
    }

    if (name.length < 3) {
        showNotification('⚠️ Name must be at least 3 characters!');
        return;
    }

    if (!email.includes('@')) {
        showNotification('⚠️ Please enter a valid email!');
        return;
    }

    if (password.length < 6) {
        showNotification('⚠️ Password must be at least 6 characters!');
        return;
    }

    if (password !== confirm) {
        showNotification('⚠️ Passwords do not match!');
        return;
    }

    if (!terms) {
        showNotification('⚠️ Please agree to Terms & Conditions!');
        return;
    }

    try {
        // Firebase email/password sign up
        const cred = await firebaseSignUpWithEmail(name, email, password, phone);
        const idToken = await firebaseGetIdToken(cred.user);

        // Backend: verify idToken + create/upsert local user + return JWT
        const data = await apiFetch('/api/auth/firebase-login', {
            method: 'POST',
            body: { idToken },
            token: null
        });

        if (data?.token) setAuthToken(data.token);
        if (data?.user) {
            currentUser = data.user;
            localStorage.setItem('loggedInUser', JSON.stringify({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                phone: data.user.phone || '',
                joinedAt: data.user.joinedAt
            }));
            showLoggedInUser(JSON.parse(localStorage.getItem('loggedInUser')));
        }

        closeAuthModal();
        showNotification('🎉 Account created successfully!');

        try { initSavedFeatures(); } catch {}
    } catch (e) {
        const msg = String(e?.message || e);
        showNotification(`❌ Signup failed: ${msg}`);
    }
}




// Logout User
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    clearAuthToken();
    currentUser = null;
    document.getElementById('userSection').style.display = 'flex';
    document.getElementById('userLoggedIn').style.display = 'none';
    document.getElementById('userDropdown').classList.remove('active');
    showNotification('👋 Logged out successfully!');
}


// Toggle User Dropdown
function toggleUserMenu() {
    document.getElementById('userDropdown').classList.toggle('active');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('userDropdown');
    const avatar = document.querySelector('.user-avatar');
    if (dropdown && avatar && !avatar.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

// Close auth modal on outside click
document.getElementById('authModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeAuthModal();
    }
});

// ============================================
// PROFILE MODAL FUNCTIONS
// ============================================

function openProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Load user data
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
        document.getElementById('profileName').value = user.name || '';
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profilePhone').value = user.phone || '';
        document.getElementById('profileJoined').value = user.joined ? new Date(user.joined).toLocaleDateString() : 'Today';
        
        // Load profile image
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            document.getElementById('profilePreview').src = savedImage;
            document.getElementById('userProfileImage').src = savedImage;
            document.getElementById('dropdownProfileImage').src = savedImage;
        }
    }
}

function closeProfileModal() {
    const modal = document.getElementById('profileModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close profile modal on outside click
document.getElementById('profileModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeProfileModal();
    }
});

// ============================================
// PROFILE IMAGE UPLOAD
// ============================================

function uploadProfileImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        showNotification('⚠️ Image size should be less than 2MB!');
        return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
        showNotification('⚠️ Please upload a valid image!');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imageData = e.target.result;
        
        // Update all profile images
        document.getElementById('profilePreview').src = imageData;
        document.getElementById('userProfileImage').src = imageData;
        document.getElementById('dropdownProfileImage').src = imageData;
        
        // Save to localStorage
        localStorage.setItem('profileImage', imageData);
        
        showNotification('✅ Profile photo updated successfully!');
    };
    reader.readAsDataURL(file);
}

// ============================================
// UPDATE PROFILE
// ============================================

function updateProfile() {
    const name = document.getElementById('profileName').value.trim();
    const phone = document.getElementById('profilePhone').value.trim();
    
    if (!name) {
        showNotification('⚠️ Name cannot be empty!');
        return;
    }
    
    // Get current user
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (currentUser) {
        // Update user in users array
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex].name = name;
            users[userIndex].phone = phone;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Update logged in user
        currentUser.name = name;
        currentUser.phone = phone;
        localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
        
        // Update UI
        document.getElementById('userNameDisplay').textContent = name;
        document.getElementById('dropdownUserName').textContent = name;
        
        showNotification('✅ Profile updated successfully!');
        closeProfileModal();
    }
}

// ============================================
// CLOSE MODALS ON ESCAPE KEY
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeAuthModal();
        closeProfileModal();
        closeMembershipModal();
    }
});

// ============================================
// CHECK AUTH ON LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const remembered = localStorage.getItem('rememberMe');
    if (remembered) {
        document.getElementById('loginEmail').value = remembered;
    }

    checkAuth();

    // init saved features (progress/workouts/bookings)
    initSavedFeatures();
});



// ================================
// INTERVAL MODE UI TOGGLE
// ================================
function onToggleIntervalMode() {
    const intervalMode = document.getElementById('intervalMode');
    const intervalSettings = document.getElementById('intervalSettings');
    const timerInput = document.getElementById('timerInput');

    if (!intervalMode || !intervalSettings) return;

    if (intervalMode.checked) {
        intervalSettings.style.display = 'block';
        if (timerInput) timerInput.disabled = true;
        // stop normal timer if running
        try {
            if (timerRunning) {
                pauseTimer();
            }
        } catch {}
    } else {
        intervalSettings.style.display = 'none';
        if (timerInput) timerInput.disabled = false;
    }
}

// ================================
// LEAVE A REVIEW (localStorage)
// ================================
const REVIEWS_KEY = 'rajGym_reviews_public';

function openReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const hint = document.getElementById('reviewCharHint');
    const ta = document.getElementById('reviewText');
    if (hint && ta) hint.textContent = `${ta.value.length}/400`;
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function getAllReviews() {
    try {
        const raw = localStorage.getItem(REVIEWS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function setAllReviews(reviews) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

function submitReview(e) {
    if (e) e.preventDefault();

    const nameEl = document.getElementById('reviewName');
    const ratingEl = document.getElementById('reviewRating');
    const textEl = document.getElementById('reviewText');

    const name = (nameEl?.value || '').trim();
    const rating = parseInt(ratingEl?.value, 10);
    const text = (textEl?.value || '').trim();

    if (!name || name.length < 2) return showNotification('⚠️ Enter valid name');
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) return showNotification('⚠️ Select rating');
    if (!text || text.length < 10) return showNotification('⚠️ Write at least 10 characters');

    const review = {
        id: Date.now(),
        name,
        rating,
        text,
        createdAt: new Date().toISOString()
    };

    const reviews = getAllReviews();
    reviews.unshift(review);
    setAllReviews(reviews.slice(0, 50));

    // Close modal and reset
    closeReviewModal();

    // Clear form
    nameEl.value = '';
    ratingEl.value = '';
    textEl.value = '';
    const hint = document.getElementById('reviewCharHint');
    if (hint) hint.textContent = '0/400';

    // Show notification
    showNotification('✅ Review submitted! Thanks for your feedback.');

    // Render reviews into testimonials track (append up to 3)
    renderUserReviewsIntoTestimonials();
}

function renderUserReviewsIntoTestimonials() {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;

    const reviews = getAllReviews();
    const top = reviews.slice(0, 3);

    // If we already injected review cards, mark them.
    track.querySelectorAll('.testimonial-card.user-review').forEach(el => el.remove());

    if (top.length === 0) return;

    top.forEach(r => {
        const card = document.createElement('div');
        card.className = 'testimonial-card user-review';
        const stars = '⭐'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
        card.innerHTML = `
            <div class="testimonial-stars">${stars}</div>
            <p>"${escapeHtml(r.text)}"</p>
            <div class="testimonial-author">
                <img src="https://randomuser.me/api/portraits/men/3.jpg" alt="User">
                <div>
                    <h4>${escapeHtml(r.name)}</h4>
                    <small>${new Date(r.createdAt).toLocaleDateString()}</small>
                </div>
            </div>
        `;
        track.appendChild(card);
    });
}

function escapeHtml(str) {
    return String(str)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '<')
        .replaceAll('>', '>')
        .replaceAll('"', '"')
        .replaceAll("'", '&#039;');
}

// ===== Attach review modal listeners + interval UI wiring =====
(function initExtras() {
    document.addEventListener('DOMContentLoaded', () => {
        const intervalMode = document.getElementById('intervalMode');
        if (intervalMode) onToggleIntervalMode();

        const reviewText = document.getElementById('reviewText');
        const reviewCharHint = document.getElementById('reviewCharHint');
        if (reviewText && reviewCharHint) {
            reviewText.addEventListener('input', () => {
                reviewCharHint.textContent = `${reviewText.value.length}/400`;
            });
        }

        // Render existing reviews (if any)
        try { renderUserReviewsIntoTestimonials(); } catch {}

        // Hook modal close on outside click
        const reviewModal = document.getElementById('reviewModal');
        if (reviewModal) {
            reviewModal.addEventListener('click', function(ev) {
                if (ev.target === this) closeReviewModal();
            });
        }

        // Ensure Escape closes review modal
        document.addEventListener('keydown', function(ev) {
            if (ev.key === 'Escape') {
                closeReviewModal();
            }
        });
    });
})();

// ============================================
// WORKOUT LOG CALENDAR + DASHBOARD (Saved progress + workout logs)
// ============================================
(function initWorkoutLogAndDashboard() {
    const dashboard = document.getElementById('dashboard');
    const workoutLog = document.getElementById('workoutLog');
    if (!dashboard && !workoutLog) return;

    // show only when logged in
    const email = getLoggedUserEmail();
    if (dashboard) dashboard.style.display = email ? 'block' : 'none';
    if (workoutLog) workoutLog.style.display = email ? 'block' : 'none';

    if (!email) return;

    // Views: week/month for now (we implement week grid; month uses same week grid label for simplicity)
    const state = {
        email,
        view: 'week',
        cursor: new Date()
    };

    const STORAGE = {
        workoutLogs: (e) => `rajGym_workoutLogs_${e}`
    };

    function pad2(n) { return String(n).padStart(2,'0'); }
    function dateKey(d) {
        return `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
    }

    function startOfWeekMon(d) {
        const x = new Date(d);
        const day = x.getDay(); // Sun=0
        const diff = (day === 0 ? -6 : 1 - day); // Mon =>0
        x.setDate(x.getDate() + diff);
        x.setHours(0,0,0,0);
        return x;
    }

    function loadWorkoutLogs() {
        const raw = localStorage.getItem(STORAGE.workoutLogs(state.email));
        if (!raw) return {};
        try { return JSON.parse(raw) || {}; } catch { return {}; }
    }

    function saveWorkoutLogs(logs) {
        localStorage.setItem(STORAGE.workoutLogs(state.email), JSON.stringify(logs));
    }

    function getSavedDay(logs, key) {
        return logs[key] || { done: false, title: '', notes: '' };
    }

    function ensureDashboardDataRender() {
        // completion last 7 days
        const completionBars = document.getElementById('completionBars');
        const completionMeta = document.getElementById('completionMeta');

        const trends = {
            strength: document.getElementById('trendStrength'),
            cardio: document.getElementById('trendCardio'),
            flexibility: document.getElementById('trendFlex'),
            nutrition: document.getElementById('trendNutrition')
        };

        if (!completionBars || !completionMeta) return;

        const logs = loadWorkoutLogs();

        const last7 = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const dd = new Date(today);
            dd.setDate(today.getDate() - i);
            last7.push({ key: dateKey(dd), d: dd });
        }

        const completedCount = last7.reduce((acc, x) => acc + (getSavedDay(logs, x.key).done ? 1 : 0), 0);
        completionMeta.textContent = `${completedCount}/7 days completed`;

        completionBars.innerHTML = '';
            last7.forEach((x, idx) => {
            const done = getSavedDay(logs, x.key).done;
            const bar = document.createElement('div');
            bar.className = 'workout-completion-day' + (done ? ' done' : '');
            const dayLabel = x.d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
            bar.setAttribute('data-label', `${dayLabel}\n${done ? 'Done ✅' : 'Not done'}`);
            bar.style.height = done ? '100%' : '18%';
            completionBars.appendChild(bar);
        });

        // progress trend: uses last saved progress slider values (no history yet)
        // So we render flat bars from current progress values.
        const currentProgress = {
            strength: Number(localStorage.getItem(STORAGE_KEYS.progress(state.email)) ? JSON.parse(localStorage.getItem(STORAGE_KEYS.progress(state.email))).strength : 75),
            cardio: Number(localStorage.getItem(STORAGE_KEYS.progress(state.email)) ? JSON.parse(localStorage.getItem(STORAGE_KEYS.progress(state.email))).cardio : 60),
            flexibility: Number(localStorage.getItem(STORAGE_KEYS.progress(state.email)) ? JSON.parse(localStorage.getItem(STORAGE_KEYS.progress(state.email))).flexibility : 45),
            nutrition: Number(localStorage.getItem(STORAGE_KEYS.progress(state.email)) ? JSON.parse(localStorage.getItem(STORAGE_KEYS.progress(state.email))).nutrition : 80)
        };

        const trendKeys = ['strength','cardio','flexibility','nutrition'];
        trendKeys.forEach(k => {
            const el = trends[k];
            if (!el) return;
            const percent = Math.min(100, Math.max(0, Number.isFinite(currentProgress[k]) ? currentProgress[k] : 50));
            el.innerHTML = '';
            for (let i = 0; i < 7; i++) {
                const mb = document.createElement('div');
                mb.className = i === 6 ? 'last' : '';
                mb.style.height = `${percent}%`;
                el.appendChild(mb);
            }
            el.style.display = 'flex';
            el.style.alignItems = 'flex-end';
        });
    }

    // Calendar grid
    let view = 'week';
    let cursor = new Date();

    function renderCalendar() {
        const logGrid = document.getElementById('workoutLogGrid');
        const viewSel = document.getElementById('logView');
        if (!logGrid || !viewSel) return;

        view = viewSel.value;
        state.view = view;

        logGrid.innerHTML = '';

        const logs = loadWorkoutLogs();

        if (view === 'week') {
            const start = startOfWeekMon(cursor);
            for (let i = 0; i < 7; i++) {
                const day = new Date(start);
                day.setDate(start.getDate() + i);
                const key = dateKey(day);
                const saved = getSavedDay(logs, key);

                const cell = document.createElement('div');
                cell.className = 'workout-log-cell';
                cell.style.border = '1px solid rgba(255,255,255,0.08)';
                cell.style.borderRadius = '14px';
                cell.style.padding = '12px';
                cell.style.background = 'rgba(255,255,255,0.03)';
                cell.style.minHeight = '110px';

                const title = document.createElement('div');
                title.style.fontWeight = '900';
                title.style.color = 'var(--primary)';
                title.textContent = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i];

                const date = document.createElement('div');
                date.style.color = 'var(--gray)';
                date.style.fontSize = '0.8rem';
                date.textContent = day.toLocaleDateString();

                const checkboxWrap = document.createElement('div');
                checkboxWrap.style.marginTop = '10px';
                checkboxWrap.style.display = 'flex';
                checkboxWrap.style.alignItems = 'center';
                checkboxWrap.style.gap = '10px';

                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = !!saved.done;
                cb.onchange = () => {
                    logs[key] = { ...getSavedDay(logs, key), done: cb.checked };
                    saveWorkoutLogs(logs);
                    ensureDashboardDataRender();
                    document.getElementById('workoutLogMsg')?.style && (document.getElementById('workoutLogMsg').style.display='block');
                    setTimeout(() => {
                        const m = document.getElementById('workoutLogMsg');
                        if (m) m.style.display = 'none';
                    }, 1200);
                };

                const cbLabel = document.createElement('div');
                cbLabel.textContent = 'Done';
                cbLabel.style.fontWeight = '800';
                cbLabel.style.color = 'var(--light)';

                checkboxWrap.appendChild(cb);
                checkboxWrap.appendChild(cbLabel);

                const notes = document.createElement('textarea');
                notes.value = saved.notes || '';
                notes.placeholder = 'Notes (optional)';
                notes.style.width = '100%';
                notes.style.marginTop = '10px';
                notes.style.minHeight = '46px';
                notes.style.resize = 'vertical';
                notes.style.background = 'rgba(255,255,255,0.05)';
                notes.style.border = '1px solid rgba(255,255,255,0.08)';
                notes.style.borderRadius = '10px';
                notes.style.color = 'var(--light)';
                notes.onchange = () => {
                    const cur = loadWorkoutLogs();
                    const prev = getSavedDay(cur, key);
                    cur[key] = { ...prev, notes: notes.value };
                    saveWorkoutLogs(cur);
                };

                const inputTitle = document.createElement('input');
                inputTitle.value = saved.title || '';
                inputTitle.placeholder = 'Workout title';

                const inputType = document.createElement('input');
                inputType.value = saved.type || '';
                inputType.placeholder = 'Workout type (e.g., Strength)';
                inputType.style.width = '100%';
                inputType.style.marginTop = '10px';
                inputType.style.padding = '10px 12px';
                inputType.style.background = 'rgba(255,255,255,0.05)';
                inputType.style.border = '1px solid rgba(255,255,255,0.08)';
                inputType.style.borderRadius = '10px';
                inputType.style.color = 'var(--light)';

                const inputDuration = document.createElement('input');
                inputDuration.type = 'number';
                inputDuration.value = Number(saved.duration || 0) || '';
                inputDuration.placeholder = 'Duration (minutes)';
                inputDuration.min = '1';
                inputDuration.max = '300';
                inputDuration.style.width = '100%';
                inputDuration.style.marginTop = '10px';
                inputDuration.style.padding = '10px 12px';
                inputDuration.style.background = 'rgba(255,255,255,0.05)';
                inputDuration.style.border = '1px solid rgba(255,255,255,0.08)';
                inputDuration.style.borderRadius = '10px';
                inputDuration.style.color = 'var(--light)';
                inputTitle.style.width = '100%';
                inputTitle.style.marginTop = '10px';
                inputTitle.style.padding = '10px 12px';
                inputTitle.style.background = 'rgba(255,255,255,0.05)';
                inputTitle.style.border = '1px solid rgba(255,255,255,0.08)';
                inputTitle.style.borderRadius = '10px';
                inputTitle.style.color = 'var(--light)';
                inputTitle.onchange = () => {
                    const cur = loadWorkoutLogs();
                    const prev = getSavedDay(cur, key);
                    cur[key] = { ...prev, title: inputTitle.value };
                    saveWorkoutLogs(cur);
                };

                inputType.onchange = () => {
                    const cur = loadWorkoutLogs();
                    const prev = getSavedDay(cur, key);
                    cur[key] = { ...prev, type: inputType.value };
                    saveWorkoutLogs(cur);
                };

                inputDuration.onchange = () => {
                    const cur = loadWorkoutLogs();
                    const prev = getSavedDay(cur, key);
                    const v = parseInt(inputDuration.value, 10);
                    cur[key] = { ...prev, duration: Number.isFinite(v) ? Math.max(1, v) : prev.duration };
                    saveWorkoutLogs(cur);
                };

                cell.appendChild(title);
                cell.appendChild(date);
                cell.appendChild(checkboxWrap);
                cell.appendChild(inputTitle);
                cell.appendChild(inputType);
                cell.appendChild(inputDuration);
                cell.appendChild(notes);

                logGrid.appendChild(cell);
            }

            // quick layout
            logGrid.style.display = 'grid';
            logGrid.style.gridTemplateColumns = 'repeat(7, minmax(0, 1fr))';
            logGrid.style.gap = '12px';
        } else {
            // month: we keep it simple (grid of 28 days using same week style)
            // for now show current week (avoid too big UI)
            viewSel.value = 'week';
            renderCalendar();
        }
    }

    // controls
    function shiftWorkoutLog(dir) {
        cursor.setDate(cursor.getDate() + dir * 7);
        renderCalendar();
        ensureDashboardDataRender();
    }

    function gotoTodayWorkoutLog() {
        cursor = new Date();
        renderCalendar();
        ensureDashboardDataRender();
    }

    function saveTodayLogQuick() {
        const email2 = getLoggedUserEmail();
        if (!email2) return;

        const logs = loadWorkoutLogs();
        const todayKey = dateKey(new Date());

        // done + title/type/duration based on lastGeneratedWorkout (if exists)
        const title = (window.lastGeneratedWorkout && window.lastGeneratedWorkout.level)
            ? `${window.lastGeneratedWorkout.level} ${window.lastGeneratedWorkout.focus} (${window.lastGeneratedWorkout.duration}m)`
            : 'Workout';

        const type = (window.lastGeneratedWorkout && window.lastGeneratedWorkout.focus)
            ? String(window.lastGeneratedWorkout.focus)
            : '';

        const duration = (window.lastGeneratedWorkout && window.lastGeneratedWorkout.duration)
            ? (Number(window.lastGeneratedWorkout.duration) || 0)
            : 0;

        logs[todayKey] = {
            ...getSavedDay(logs, todayKey),
            done: true,
            title,
            type,
            duration
        };

        saveWorkoutLogs(logs);
        renderCalendar();
        ensureDashboardDataRender();

        const m = document.getElementById('workoutLogMsg');
        if (m) {
            m.style.display = 'block';
            setTimeout(() => (m.style.display = 'none'), 1800);
        }

        showNotification('✅ Today workout logged');
    }

    function exportWorkoutLogs() {
        const email2 = getLoggedUserEmail();
        if (!email2) return;
        const logs = loadWorkoutLogs();
        const arr = Object.entries(logs).map(([k,v]) => ({
            dateKey: k,
            done: !!v.done,
            title: v.title || '',
            type: v.type || '',
            duration: Number(v.duration || 0) || 0,
            notes: v.notes || ''
        }));
        const blob = new Blob([JSON.stringify(arr, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `raj-gym-workout-logs-${email2}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // expose for onclick
    window.shiftWorkoutLog = shiftWorkoutLog;
    window.gotoTodayWorkoutLog = gotoTodayWorkoutLog;
    window.saveTodayLogQuick = saveTodayLogQuick;
    window.exportWorkoutLogs = exportWorkoutLogs;

    // bind select
    const logViewSel = document.getElementById('logView');
    if (logViewSel) {
        logViewSel.addEventListener('change', () => {
            cursor = new Date();
            renderCalendar();
            ensureDashboardDataRender();
        });
    }

    // initial render
    ensureDashboardDataRender();
    renderCalendar();

    // set up resize-friendly (optional)
    const grid = document.getElementById('workoutLogGrid');
    if (grid) {
        const mq = window.matchMedia('(max-width: 1100px)');
        const apply = () => {
            if (mq.matches) {
                grid.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
            } else {
                grid.style.gridTemplateColumns = 'repeat(7, minmax(0, 1fr))';
            }
        };
        apply();
        mq.addEventListener?.('change', apply);
    }
})();

console.log('%c✅ All systems ready!', 'font-size: 1rem; color: #4CAF50;');

