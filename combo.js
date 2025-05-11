document.addEventListener('DOMContentLoaded', function() {
    let combo = [];
    let products = [
        // Sample product data
        {
            id: 1,
            name: 'Medu Vada',
            price: 50,
            category: 'fried',
            description: 'Savory donut-shaped fritter made from urad dal',
            image_url: 'meduvada.jpeg',
            badge: 'Bestseller'
        },
        {
            id: 2,
            name: 'Murukku',
            price: 80,
            category: 'fried',
            description: 'Rice flour and lentil spiral snack',
            image_url: 'murukku.jpeg'
        },
        // Add more sample products as needed
    ];

    const productsContainer = document.getElementById('combo-products');
    const summaryItems = document.getElementById('summary-items');
    const comboTotal = document.getElementById('combo-total');
    const addComboButton = document.getElementById('add-combo-to-cart');
    const searchInput = document.getElementById('combo-search');
    const filterButtons = document.querySelectorAll('.filter-btn');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.cart-count').textContent = count;
        const cartCount = document.querySelector('.cart-count');
        cartCount.classList.add('animate__animated', 'animate__rubberBand');
        setTimeout(() => {
            cartCount.classList.remove('animate__animated', 'animate__rubberBand');
        }, 1000);
    }

    function renderProducts(category = 'all', searchTerm = '') {
        productsContainer.innerHTML = '';
        const searchLower = searchTerm.toLowerCase();

        products.forEach(product => {
            const categoryMatch = category === 'all' || product.category === category;
            const searchMatch = searchLower === '' ||
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower);

            if (categoryMatch && searchMatch) {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.dataset.category = product.category;
                productCard.innerHTML = `
                    <div class="product-img-container">
                        <img src="${product.image_url}" alt="${product.name}" class="product-img">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-price">₹${product.price}</p>
                        <p class="product-description">${product.description}</p>
                        <div class="quantity-control">
                            <button class="quantity-decrement">-</button>
                            <input type="number" class="quantity-input" value="0" min="0" data-id="${product.id}">
                            <button class="quantity-increment">+</button>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            }
        });

        document.querySelectorAll('.quantity-increment').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.previousElementSibling;
                input.value = parseInt(input.value) + 1;
                updateCombo(input.dataset.id, parseInt(input.value));
            });
        });

        document.querySelectorAll('.quantity-decrement').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.nextElementSibling;
                if (parseInt(input.value) > 0) {
                    input.value = parseInt(input.value) - 1;
                    updateCombo(input.dataset.id, parseInt(input.value));
                }
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', () => {
                if (input.value < 0) input.value = 0;
                updateCombo(input.dataset.id, parseInt(input.value));
            });
        });
    }

    function updateCombo(productId, quantity) {
        const product = products.find(p => p.id == productId);
        const existingItem = combo.find(item => item.id == productId);

        if (existingItem) {
            if (quantity > 0) {
                existingItem.quantity = quantity;
            } else {
                combo = combo.filter(item => item.id != productId);
            }
        } else if (quantity > 0) {
            combo.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: quantity,
                img: product.image_url
            });
        }

        renderSummary();
    }

    function renderSummary() {
        summaryItems.innerHTML = '';
        if (combo.length === 0) {
            summaryItems.innerHTML = '<p class="empty-message">No items selected yet.</p>';
            addComboButton.disabled = true;
        } else {
            combo.forEach(item => {
                const summaryItem = document.createElement('div');
                summaryItem.className = 'summary-item';
                summaryItem.innerHTML = `
                    <span class="summary-item-name">${item.name}</span>
                    <div class="summary-item-details">
                        <input type="number" class="summary-item-quantity" value="${item.quantity}" min="0" data-id="${item.id}">
                        <button class="summary-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                summaryItems.appendChild(summaryItem);
            });
            addComboButton.disabled = false;
        }

        const total = combo.reduce((sum, item) => sum + item.price * item.quantity, 0);
        comboTotal.textContent = `₹${total}`;

        document.querySelectorAll('.summary-item-quantity').forEach(input => {
            input.addEventListener('change', () => {
                if (input.value < 0) input.value = 0;
                updateCombo(input.dataset.id, parseInt(input.value));
                const productInput = document.querySelector(`.quantity-input[data-id="${input.dataset.id}"]`);
                if (productInput) productInput.value = input.value;
            });
        });

        document.querySelectorAll('.summary-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                updateCombo(btn.dataset.id, 0);
                const productInput = document.querySelector(`.quantity-input[data-id="${btn.dataset.id}"]`);
                if (productInput) productInput.value = 0;
            });
        });
    }

    addComboButton.addEventListener('click', () => {
        if (combo.length === 0) return;

        // Add combo to cart in localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            id: Date.now(),
            combo_items: combo,
            quantity: 1
        });
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        const notification = document.getElementById('cart-notification');
        notification.textContent = 'Combo added to cart!';
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);

        combo = [];
        renderSummary();
        renderProducts();
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            renderProducts(category, searchInput.value);
        });
    });

    searchInput.addEventListener('input', () => {
        const activeFilter = document.querySelector('.filter-btn.active');
        renderProducts(activeFilter.dataset.category, searchInput.value);
    });

    renderProducts();
    renderSummary();
    updateCartCount();
});