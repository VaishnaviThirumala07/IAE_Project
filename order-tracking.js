const trackingForm = document.querySelector('.tracking-form');
const orderIdInput = document.getElementById('order-id');
const orderStatus = document.querySelector('.order-status');
const errorMessage = document.querySelector('.error-message');
const progressFill = document.querySelector('.progress-fill');
const progressSteps = document.querySelectorAll('.progress-step');
const displayOrderId = document.getElementById('display-order-id');
const orderDate = document.getElementById('order-date');
const estimatedDelivery = document.getElementById('estimated-delivery');
const shippingAddress = document.getElementById('shipping-address');
const currentStatus = document.getElementById('current-status');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.close-menu');
const backToTop = document.querySelector('.back-to-top');

// Simulated order data (replace with actual API call in production)
const mockOrders = {
    'ORDER123': {
        status: 'delivered',
        orderDate: '2025-04-10',
        estimatedDelivery: '2025-04-15',
        shippingAddress: '123 Snack Street, Foodville, SN 45678'
    },
    'ORDER456': {
        status: 'shipped',
        orderDate: '2025-04-12',
        estimatedDelivery: '2025-04-18',
        shippingAddress: '456 Healthy Ave, Foodville, SN 45678'
    },
    'ORDER789': {
        status: 'processing',
        orderDate: '2025-04-15',
        estimatedDelivery: '2025-04-20',
        shippingAddress: '789 Nut Lane, Foodville, SN 45678'
    }
};

// Status order for progress tracking
const statusOrder = ['ordered', 'processing', 'shipped', 'delivered'];

// Scroll-triggered animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.tracking-container, .section-title');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if(elementPosition < screenPosition) {
            element.classList.add('fade-in-up');
        }
    });
    
    // Fixed navbar on scroll
    if(window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if(window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
};

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

// Nav links close mobile menu when clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        const navbarHeight = navbar.offsetHeight;
        
        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    });
});

// Track order form submission
trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderId = orderIdInput.value.trim().toUpperCase();
    
    // Reset previous states
    errorMessage.classList.remove('active');
    orderStatus.classList.remove('active');
    progressFill.style.width = '0%';
    progressSteps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    // Check if order exists
    if (mockOrders[orderId]) {
        const order = mockOrders[orderId];
        updateOrderStatus(order, orderId);
        orderStatus.classList.add('active');
        
        // Animate progress bar
        setTimeout(() => {
            const statusIndex = statusOrder.indexOf(order.status);
            const progressWidth = (statusIndex / (statusOrder.length - 1)) * 100;
            progressFill.style.width = `${progressWidth}%`;
        }, 300);
    } else {
        errorMessage.classList.add('active');
        errorMessage.classList.add('animate__animated', 'animate__shakeX');
        setTimeout(() => {
            errorMessage.classList.remove('animate__animated', 'animate__shakeX');
        }, 1000);
    }
});

// Update order status display
function updateOrderStatus(order, orderId) {
    displayOrderId.textContent = orderId;
    orderDate.textContent = order.orderDate;
    estimatedDelivery.textContent = order.estimatedDelivery;
    shippingAddress.textContent = order.shippingAddress;
    currentStatus.textContent = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    
    // Update progress steps
    const statusIndex = statusOrder.indexOf(order.status);
    progressSteps.forEach((step, index) => {
        if (index <= statusIndex) {
            step.classList.add('completed');
        } else if (index === statusIndex + 1) {
            step.classList.add('active');
        }
    });
}

// Initialize animations on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Intersection Observer for lazy loading and animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.tracking-container').forEach(element => {
    observer.observe(element);
});