document.addEventListener('DOMContentLoaded', function() {
    const orderItemsContainer = document.querySelector('.order-items');
    const subtotalElement = document.querySelector('.subtotal');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total-price');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentDetails = document.querySelectorAll('.payment-details');
    const checkoutForm = document.querySelector('.checkout-form');
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
    }
    
    function renderOrderItems() {
        if (cart.length === 0) {
            window.location.href = 'cart.html';
            return;
        }
        
        orderItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const name = item.combo_items ? `Custom Combo (${item.combo_items.map(i => i.name).join(', ')})` : item.name;
            const price = item.combo_items ? item.combo_items.reduce((sum, i) => sum + i.price * i.quantity, 0) : item.price;
            const img = item.combo_items ? 'combo.jpeg' : item.image_url;
            
            const orderItemElement = document.createElement('div');
            orderItemElement.className = 'order-item';
            orderItemElement.innerHTML = `
                <img src="${img}" alt="${name}" class="order-item-img">
                <div class="order-item-details">
                    <h3 class="order-item-title">${name}</h3>
                    <p class="order-item-price">₹${price.toFixed(2)}</p>
                    <p class="order-item-quantity">Quantity: ${item.quantity}</p>
                </div>
            `;
            
            orderItemsContainer.appendChild(orderItemElement);
        });
        
        const subtotal = cart.reduce((total, item) => {
            const price = item.combo_items ? item.combo_items.reduce((sum, i) => sum + i.price * i.quantity, 0) : item.price;
            return total + (price * item.quantity);
        }, 0);
        
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        totalElement.textContent = `₹${subtotal.toFixed(2)}`;
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
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(checkoutForm);
        const orderData = {
            id: Date.now().toString(),
            created_at: new Date().toISOString(),
            status: 'pending',
            shippingAddress: {
                fullName: formData.get('fullName'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zipCode: formData.get('zipCode'),
                phone: formData.get('phone')
            },
            paymentMethod: formData.get('paymentMethod'),
            items: cart.map(item => ({
                id: item.id,
                name: item.combo_items ? `Custom Combo (${item.combo_items.map(i => i.name).join(', ')})` : item.name,
                price: item.combo_items ? item.combo_items.reduce((sum, i) => sum + i.price * i.quantity, 0) : item.price,
                quantity: item.quantity
            }))
        };
        
        // Save order to localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Redirect to thank you page
        window.location.href = 'thank-you.html';
    });
    
    updateCartCount();
    renderOrderItems();
});