const API_URL = 'http://localhost:3000/api';
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

function getToken() {
    return localStorage.getItem('token');
}

const statusOrder = ['ordered', 'processing', 'shipped', 'delivered'];

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.tracking-container, .section-title');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        if (elementPosition < screenPosition) {
            element.classList.add('fade-in-up');
        }
    });
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
};

hamburger.addEventListener('click', () => {
    navLinks.classList.add('active');
});

closeMenu.addEventListener('click', () => {
    navLinks.classList.remove('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

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

trackingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const orderId = orderIdInput.value.trim().toUpperCase();
    errorMessage.classList.remove('active');
    orderStatus.classList.remove('active');
    progressFill.style.width = '0%';
    progressSteps.forEach(step => {
        step.classList.remove('active', 'completed');
    });
    
    try {
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) {
            throw new Error('Order not found');
        }
        const order = await response.json();
        updateOrderStatus(order, orderId);
        orderStatus.classList.add('active');
        setTimeout(() => {
            const statusIndex = statusOrder.indexOf(order.status);
            const progressWidth = (statusIndex / (statusOrder.length - 1)) * 100;
            progressFill.style.width = `${progressWidth}%`;
        }, 300);
    } catch (err) {
        errorMessage.classList.add('active');
        errorMessage.classList.add('animate__animated', 'animate__shakeX');
        setTimeout(() => {
            errorMessage.classList.remove('animate__animated', 'animate__shakeX');
        }, 1000);
    }
});

function updateOrderStatus(order, orderId) {
    displayOrderId.textContent = orderId;
    orderDate.textContent = new Date(order.created_at).toLocaleDateString();
    estimatedDelivery.textContent = new Date(new Date(order.created_at).setDate(new Date(order.created_at).getDate() + 5)).toLocaleDateString();
    shippingAddress.textContent = `${order.shipping_address.address}, ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.pincode}`;
    currentStatus.textContent = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    const statusIndex = statusOrder.indexOf(order.status);
    progressSteps.forEach((step, index) => {
        if (index <= statusIndex) {
            step.classList.add('completed');
        } else if (index === statusIndex + 1) {
            step.classList.add('active');
        }
    });
}

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

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

document.querySelectorAll('.tracking-container').forEach(element => {
    observer.observe(element);
});