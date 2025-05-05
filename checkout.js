document.addEventListener('DOMContentLoaded', function() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total-price');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentDetails = document.querySelectorAll('.payment-details');
    
    // Update cart count in navbar
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
    }
    
    // Render order items
    function renderOrderItems() {
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }
        
        orderItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const orderItemElement = document.createElement('div');
            orderItemElement.className = 'order-item';
            orderItemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="order-item-img">
                <div class="order-item-details">
                    <h4 class="order-item-title">${item.name}</h4>
                    <p class="order-item-price">₹${(item.price * item.quantity).toFixed(2)}</p>
                    <p class="order-item-quantity">Qty: ${item.quantity}</p>
                </div>
            `;
            
            orderItemsContainer.appendChild(orderItemElement);
        });
        
        updateTotals();
    }
    
    // Update totals
    function updateTotals() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18; // 18% GST
        const total = subtotal + tax;
        
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        taxElement.textContent = `₹${tax.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            // Add active class to clicked method
            this.classList.add('active');
            
            // Hide all payment details
            paymentDetails.forEach(detail => detail.style.display = 'none');
            // Show selected payment details
            const methodName = this.getAttribute('data-method');
            document.getElementById(`${methodName}-details`).style.display = 'block';
        });
    });
    
    // Form submission
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate order processing
        placeOrderBtn.textContent = 'Processing...';
        placeOrderBtn.disabled = true;
        
        // In a real implementation, you would send the form data to your server
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('cart');
            
            // Redirect to thank you page
            window.location.href = 'thank-you.html';
        }, 2000);
    });
    
    // Initialize
    updateCartCount();
    renderOrderItems();
});