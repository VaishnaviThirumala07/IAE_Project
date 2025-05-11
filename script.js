const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.close-menu');
const cartCount = document.querySelector('.cart-count');
const backToTop = document.querySelector('.back-to-top');

// Cart functionality
let cart = [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.classList.add('animate__animated', 'animate__rubberBand');
    setTimeout(() => {
        cartCount.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
}

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature, .product-card, .section-title, .tracking-container');
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

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('product-card') || 
                entry.target.classList.contains('feature') || 
                entry.target.classList.contains('tracking-container')) {
                entry.target.classList.add('fade-in-up');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .feature, .tracking-container').forEach(element => {
    observer.observe(element);
});

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
    }
    
    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-id');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('₹', ''));
            const productImg = productCard.querySelector('.product-img').src;
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image_url: productImg,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Added to cart!';
            productCard.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 2000);
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Save email to localStorage
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            }
            
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
    // Order tracking
    const trackOrderForm = document.querySelector('.track-order-form');
    if (trackOrderForm) {
        trackOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const orderId = this.querySelector('input[type="text"]').value;
            
            // Get orders from localStorage
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const order = orders.find(o => o.id === orderId);
            
            if (order) {
                alert(`Order Status: ${order.status}\nOrder Date: ${new Date(order.created_at).toLocaleDateString()}`);
            } else {
                alert('Order not found. Please check your order ID.');
            }
        });
    }
    
    // Initialize cart count
    updateCartCount();
});

if (document.querySelector('.hero')) {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('₹', ''));
            
            // Add to cart
            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            updateCartCount();
            
            // Show notification
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.textContent = `${productName} added to cart!`;
            document.body.appendChild(notification);
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 2000);
            
            // Update button state
            const btn = e.target;
            btn.textContent = 'Added!';
            btn.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.backgroundColor = '';
            }, 1500);
        });
    });

    const buildComboBtn = document.querySelector('.build-combo-btn');
    if (buildComboBtn) {
        buildComboBtn.addEventListener('click', () => {
            window.location.href = 'combo.html';
        });
    }

    document.querySelector('.cart-icon').addEventListener('click', function() {
        window.location.href = 'cart.html';
    });

    const testimonialWrapper = document.querySelector('.testimonial-wrapper');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    let currentTestimonial = 0;
    const totalTestimonials = testimonials.length;

    function showTestimonial(index) {
        if (index < 0) {
            currentTestimonial = totalTestimonials - 1;
        } else if (index >= totalTestimonials) {
            currentTestimonial = 0;
        } else {
            currentTestimonial = index;
        }
        testimonialWrapper.style.transform = `translateX(-${currentTestimonial * 20}%)`;
    }

    prevBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });

    nextBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });

    let testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    testimonialWrapper.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialWrapper.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    });

    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        const btn = newsletterForm.querySelector('button');
        btn.textContent = 'Subscribed!';
        btn.style.background = 'var(--accent-color)';
        newsletterForm.querySelector('input').value = '';
        setTimeout(() => {
            btn.textContent = 'Subscribe';
            btn.style.background = 'var(--primary-color)';
        }, 2000);
    });

    const productSearch = document.getElementById('product-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            filterProducts(category, productSearch.value);
        });
    });

    productSearch.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active');
        filterProducts(activeFilter.dataset.category, productSearch.value);
    });

    function filterProducts(category, searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        productCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            const categoryMatch = category === 'all' || cardCategory === category;
            const searchMatch = searchLower === '' || 
                              title.includes(searchLower) || 
                              description.includes(searchLower);
            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                card.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                card.style.display = 'none';
                card.classList.remove('animate__animated', 'animate__fadeIn');
            }
        });
    }

    filterProducts('all', '');

    const pincodeInput = document.getElementById('pincode-input');
    const checkDeliveryBtn = document.getElementById('check-delivery');
    const deliveryIcon = document.getElementById('delivery-icon');
    const deliveryText = document.getElementById('delivery-text');

    const serviceablePincodes = [
        '400001', '110001', '600001', '700001', '560001',
        '411001', '380001', '302001', '800001'
    ];

    const serviceableAreas = [
        '400***', '110***', '600***', '700***', '560***'
    ];

    checkDeliveryBtn.addEventListener('click', checkDelivery);
    pincodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkDelivery();
        }
    });

    function checkDelivery() {
        const pincode = pincodeInput.value.trim();
        if (!/^\d{6}$/.test(pincode)) {
            showDeliveryMessage('Please enter a valid 6-digit pin code', false);
            return;
        }
        const isAvailable = serviceablePincodes.includes(pincode) || 
                           serviceableAreas.some(pattern => {
                               const regex = new RegExp(pattern.replace(/\*/g, '\\d'));
                               return regex.test(pincode);
                           });
        if (isAvailable) {
            showDeliveryMessage('Delivery available in your area', true);
        } else {
            showDeliveryMessage('Currently not delivering here', false);
        }
    }

    function showDeliveryMessage(message, isAvailable) {
        deliveryIcon.textContent = isAvailable ? '✔' : '❌';
        deliveryIcon.className = isAvailable ? 'delivery-available' : 'delivery-not-available';
        deliveryText.textContent = message;
        deliveryIcon.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(() => {
            deliveryIcon.classList.remove('animate__animated', 'animate__bounceIn');
        }, 1000);
    }

    updateCartCount();
}

if (document.querySelector('.order-tracking')) {
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

    const statusOrder = ['ordered', 'processing', 'shipped', 'delivered'];

    trackingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const orderId = orderIdInput.value.trim().toUpperCase();
        errorMessage.classList.remove('active');
        orderStatus.classList.remove('active');
        progressFill.style.width = '0%';
        progressSteps.forEach(step => {
            step.classList.remove('active', 'completed');
        });

        // Simulate order tracking
        const mockOrder = {
            id: orderId,
            created_at: new Date().toISOString(),
            status: 'processing',
            shipping_address: {
                address: '123 Main Street',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400001'
            }
        };

        updateOrderStatus(mockOrder, orderId);
        orderStatus.classList.add('active');
        setTimeout(() => {
            const statusIndex = statusOrder.indexOf(mockOrder.status);
            const progressWidth = (statusIndex / (statusOrder.length - 1)) * 100;
            progressFill.style.width = `${progressWidth}%`;
        }, 300);
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
}