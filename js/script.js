// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon based on current theme
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to Dark Mode';
    }
}

// Initialize theme icon
updateThemeIcon(currentTheme);

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--navbar-bg)';
    } else {
        navbar.style.background = 'var(--navbar-bg)';
    }
});

// Google Maps Integration - Using Embed Iframe (No API Key Required)
// Location: Peroor, Ettumanoor, Kerala - 686637
// Google Maps Link: https://maps.app.goo.gl/kYYUkSKFbVq8iSe59
// Coordinates: 9.643292, 76.565780

// Menu category filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const menuSections = document.querySelectorAll('.menu-section');
const categorySelect = document.getElementById('categorySelect');

function filterMenuBy(category) {
    if (!menuSections) return;
    menuSections.forEach(section => {
        if (category === 'all' || section.id === category) {
            section.style.display = 'block';
            section.style.animation = 'fadeInUp 0.5s ease';
        } else {
            section.style.display = 'none';
        }
    });
}

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        filterMenuBy(category);
        if (categorySelect) categorySelect.value = category;
    });
});

// Dropdown change handler (mobile)
if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
        const selected = e.target.value;
        filterMenuBy(selected);
        // sync active state on chips for larger screens if visible
        categoryBtns.forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-category') === selected);
        });
        // Smooth scroll to items
        const target = selected === 'all' ? document.querySelector('.menu-items') : document.getElementById(selected);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

// Enhance menu items: add thumbnails from Unsplash and fill missing descriptions
function generateFallbackDescription(itemName) {
    const base = itemName.toLowerCase();
    if (base.includes('fried rice')) return 'Fragrant wok-tossed rice with fresh veggies and premium spices.';
    if (base.includes('noodles')) return 'Silky noodles tossed in our house-made sauce with aromatics.';
    if (base.includes('biriyani') || base.includes('biriyani')) return 'Aromatic long-grain rice layered with spices and slow-cooked flavors.';
    if (base.includes('soup')) return 'Comforting and flavorful soup prepared fresh.';
    if (base.includes('burger')) return 'Juicy patty in a toasted bun with crisp veggies and sauce.';
    if (base.includes('fries')) return 'Crispy golden fries with a signature seasoning.';
    if (base.includes('wrap')) return 'Warm tortilla wrap packed with fresh fillings and sauces.';
    if (base.includes('salad')) return 'Fresh greens tossed with crunchy veggies and dressing.';
    if (base.includes('chicken')) return 'Chef’s special chicken preparation with bold spices.';
    if (base.includes('beef')) return 'Tender beef cooked to perfection with rich spices.';
    return 'Crafted in-house with fresh ingredients and authentic flavors.';
}

function attachMenuImages() {
    const items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        const titleEl = item.querySelector('h3');
        const descEl = item.querySelector('.menu-item-content p');
        if (!titleEl) return;
        const name = titleEl.textContent.trim();

        // If description empty, add a generated one
        if (descEl && (!descEl.textContent || descEl.textContent.trim() === '')) {
            descEl.textContent = generateFallbackDescription(name);
        }

        // If image not already present, prepend one
        if (!item.querySelector('img.menu-thumb')) {
            const img = document.createElement('img');
            img.className = 'menu-thumb';
            const query = encodeURIComponent(name + ' food');
            // Unsplash source without API key
            img.src = `https://source.unsplash.com/featured/300x300/?${query}`;
            img.alt = name;
            item.insertBefore(img, item.firstElementChild);
        }
    });
}

document.addEventListener('DOMContentLoaded', attachMenuImages);


// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.category-card, .menu-item, .review-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Search functionality for menu (if needed in future)
function searchMenu(query) {
    const menuItems = document.querySelectorAll('.menu-item');
    const searchTerm = query.toLowerCase();
    
    menuItems.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        if (itemText.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Add to cart functionality (placeholder for future implementation)
function addToCart(itemName, price) {
    // This would integrate with a shopping cart system
    console.log(`Added ${itemName} (${price}) to cart`);
    // Show notification
    showNotification(`${itemName} added to cart!`);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #ff6b35;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme on every page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon if it exists on this page
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        updateThemeIcon(savedTheme);
    }
    
    // Set active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize menu category filtering
    if (menuSections.length > 0) {
        // Show all sections by default
        menuSections.forEach(section => {
            section.style.display = 'block';
        });
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Google reviews removed per request
