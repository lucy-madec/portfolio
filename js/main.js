// Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');

// Toggle navigation menu
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && e.target !== burger && !burger.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        burger.classList.remove('active');
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Portfolio filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            burger.classList.remove('active');
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic form validation
        if (!name || !email || !subject || !message) {
            alert('Veuillez remplir tous les champs du formulaire.');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For demo purposes, we'll just show a success message
        alert(`Merci ${name} pour votre message ! Je vous répondrai dès que possible.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Check for saved theme preference or use default
const getCurrentTheme = () => {
    return localStorage.getItem('theme') || 'light';
};

// Apply the current theme on page load
const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    
    // Update the theme toggle icon
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
};

// Toggle between light and dark themes
const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
};

// Apply saved theme on page load
applyTheme(getCurrentTheme());

// Add click event to theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Animation on scroll
window.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInOnScroll = new IntersectionObserver((entries, fadeInOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('fade-in');
                fadeInOnScroll.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    sections.forEach(section => {
        section.classList.add('fade-out');
        fadeInOnScroll.observe(section);
    });
});

// Add CSS for fade animations
const style = document.createElement('style');
style.textContent = `
    .fade-out {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);
