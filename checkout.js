document.addEventListener('DOMContentLoaded', function() {
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total-price');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentDetails = document.querySelectorAll('.payment-details');
    
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
    }
    
    function renderOrderItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }
        
        orderItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const name = item.combo_items ? `Custom Snack Combo (${item.combo_items.map(i => i.name).join(', ')})` : item.name;
            const price = item.combo_items ? item.combo_items.reduce((sum, i) => sum + i.price * i.quantity, 0) : item.price;
            const img = item.combo_items ? item.combo_items[0].img : item.image_url;
            
            const orderItemElement = document.createElement('div');
            orderItemElement.className = 'order-item';
            orderItemElement.innerHTML = `
                <img src="${img}" alt="${name}" class="order-item-img">
                <div class="order-item-details">
                    <h4 class="order-item-title">${name}</h4>
                    <p class="order-item-price">₹${(price * item.quantity).toFixed(2)}</p>
                    <p class="order-item-quantity">Qty: ${item.quantity}</p>
                </div>
            `;
            
            orderItemsContainer.appendChild(orderItemElement);
        });
        
        updateTotals(cart);
    }
    
    function updateTotals(cart) {
        const subtotal = cart.reduce((total, item) => {
            const price = item.combo_items ? item.combo_items.reduce((sum, i) => sum + i.price * i.quantity, 0) : item.price;
            return total + (price * item.quantity);
        }, 0);
        const tax = subtotal * 0.18;
        const total = subtotal + tax;
        
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        taxElement.textContent = `₹${tax.toFixed(2)}`;
        totalElement.textContent = `₹${total.toFixed(2)}`;
    }
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            paymentDetails.forEach(detail => detail.style.display = 'none');
            const methodName = this.getAttribute('data-method');
            document.getElementById(`${methodName}-details`).style.display = 'block';
        });
    });
    
    document.getElementById('checkout-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const shippingAddress = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            address: document.getElementById('address').value,
            apartment: document.getElementById('apartment').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
            phone: document.getElementById('phone').value
        };
        
        const paymentMethod = document.querySelector('.payment-method.active').getAttribute('data-method');
        
        // Create order object
        const order = {
            id: 'ORD' + Date.now(),
            created_at: new Date().toISOString(),
            status: 'ordered',
            shippingAddress,
            paymentMethod,
            items: JSON.parse(localStorage.getItem('cart')) || []
        };
        
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Redirect to thank you page
        window.location.href = 'thank-you.html';
    });
    
    updateCartCount();
    renderOrderItems();
});