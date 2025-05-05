// Navigation functionality
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const closeMenu = document.querySelector('.close-menu');
const cartCount = document.querySelector('.cart-count');
const backToTop = document.querySelector('.back-to-top');

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in navbar
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    
    // Add animation
    cartCount.classList.add('animate__animated', 'animate__rubberBand');
    setTimeout(() => {
        cartCount.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
}

// Scroll-triggered animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature, .product-card, .section-title, .tracking-container');
    
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

// Intersection Observer for lazy loading and animations
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

// Observe elements that should animate on scroll
document.querySelectorAll('.product-card, .feature, .tracking-container').forEach(element => {
    observer.observe(element);
});

// Initialize animations on load and scroll
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Check if we're on the index page
if (document.querySelector('.hero')) {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.querySelector('.product-title').textContent;
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent.replace('₹', ''));
            const productImg = productCard.querySelector('.product-img').src;
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    img: productImg,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            
            // Show added to cart notification
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
            
            // Button animation
            const btn = e.target;
            btn.textContent = 'Added!';
            btn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.backgroundColor = '';
            }, 1500);
        });
    });

    // Build Your Combo functionality
    const buildComboBtn = document.querySelector('.build-combo-btn');
    if (buildComboBtn) {
        buildComboBtn.addEventListener('click', () => {
            // Placeholder for combo builder (in production, redirect to a dedicated page)
            alert('Build your custom snack combo! Select from Fried Snacks, Baked Snacks, Namkeen, Sweet Snacks, and Street Food across India.');
        });
    }

    // Make cart icon clickable
    document.querySelector('.cart-icon').addEventListener('click', function() {
        window.location.href = 'cart.html';
    });

    // Testimonial slider
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

    // Auto-slide testimonials
    let testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);

    // Pause auto-slide on hover
    testimonialWrapper.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });

    testimonialWrapper.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    });

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        try {
            // Simulating success for demo
            const btn = newsletterForm.querySelector('button');
            btn.textContent = 'Subscribed!';
            btn.style.background = 'var(--accent-color)';
            newsletterForm.querySelector('input').value = '';
            
            setTimeout(() => {
                btn.textContent = 'Subscribe';
                btn.style.background = 'var(--primary-color)';
            }, 2000);
        } catch (error) {
            console.error('Subscription error:', error);
        }
    });

    // Product filtering and search functionality
    const productSearch = document.getElementById('product-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Filter products by category
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            filterProducts(category, productSearch.value);
        });
    });

    // Search products
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
            
            // Check if product matches category filter
            const categoryMatch = category === 'all' || cardCategory === category;
            
            // Check if product matches search term
            const searchMatch = searchLower === '' || 
                              title.includes(searchLower) || 
                              description.includes(searchLower);
            
            // Show/hide product based on filters
            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                card.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                card.style.display = 'none';
                card.classList.remove('animate__animated', 'animate__fadeIn');
            }
        });
    }

    // Initialize - show all products
    filterProducts('all', '');

    // Delivery area check functionality
    const pincodeInput = document.getElementById('pincode-input');
    const checkDeliveryBtn = document.getElementById('check-delivery');
    const deliveryIcon = document.getElementById('delivery-icon');
    const deliveryText = document.getElementById('delivery-text');

    // Sample list of serviceable pincodes for India
    const serviceablePincodes = [
        '400001', '110001', '600001', '700001', '560001',
        '411001', '380001', '302001', '800001'
    ];

    // Format: first 3 digits and wildcard for broader areas
    const serviceableAreas = [
        '400***', // Mumbai area
        '110***', // Delhi area
        '600***', // Chennai area
        '700***', // Kolkata area
        '560***'  // Bangalore area
    ];

    checkDeliveryBtn.addEventListener('click', checkDelivery);
    pincodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkDelivery();
        }
    });

    function checkDelivery() {
        const pincode = pincodeInput.value.trim();
        
        // Validate pincode (basic check for 6 digits)
        if (!/^\d{6}$/.test(pincode)) {
            showDeliveryMessage('Please enter a valid 6-digit pin code', false);
            return;
        }
        
        // Check against serviceable pincodes
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
        
        // Add animation
        deliveryIcon.classList.add('animate__animated', 'animate__bounceIn');
        setTimeout(() => {
            deliveryIcon.classList.remove('animate__animated', 'animate__bounceIn');
        }, 1000);
    }

    // Initialize cart count on page load
    updateCartCount();
}

// Check if we're on the order tracking page
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

    // Simulated order data (replace with actual API call in production)
    const mockOrders = {
        'ORDER123': {
            status: 'delivered',
            orderDate: '2025-04-10',
            estimatedDelivery: '2025-04-15',
            shippingAddress: '456 Snack Lane, Mumbai, MH 400001'
        },
        'ORDER456': {
            status: 'shipped',
            orderDate: '2025-04-12',
            estimatedDelivery: '2025-04-18',
            shippingAddress: '789 Healthy Ave, Delhi, DL 110001'
        },
        'ORDER789': {
            status: 'processing',
            orderDate: '2025-04-15',
            estimatedDelivery: '2025-04-20',
            shippingAddress: '123 Nut Lane, Chennai, TN 600001'
        }
    };

    // Status order for progress tracking
    const statusOrder = ['ordered', 'processing', 'shipped', 'delivered'];

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
}