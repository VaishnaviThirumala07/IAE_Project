document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-price');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Get cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = cartCount;
    }
    
    function renderCart() {
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutBtn.disabled = true;
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        checkoutBtn.disabled = false;
        
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i> Remove
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        updateTotals();
        saveCart();
    }
    
    function updateTotals() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
        totalElement.textContent = `₹${subtotal.toFixed(2)}`;
    }
    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('minus')) {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id == id);
            if (item.quantity > 1) {
                item.quantity--;
                renderCart();
            }
        }
        
        if (e.target.classList.contains('plus')) {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id == id);
            item.quantity++;
            renderCart();
        }
        
        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const button = e.target.classList.contains('remove-item') ? e.target : e.target.closest('.remove-item');
            const id = button.getAttribute('data-id');
            cart = cart.filter(item => item.id != id);
            renderCart();
        }
    });
    
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const id = e.target.getAttribute('data-id');
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                const item = cart.find(item => item.id == id);
                item.quantity = newQuantity;
                renderCart();
            } else {
                renderCart();
            }
        }
    });
    
    checkoutBtn.addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });
    
    updateCartCount();
    renderCart();
});