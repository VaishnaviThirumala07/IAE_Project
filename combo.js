document.addEventListener('DOMContentLoaded', function() {
    let combo = [];
    let products = [
        // Fried Snacks
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
        {
            id: 3,
            name: 'Banana Chips',
            price: 120,
            category: 'fried',
            description: 'Thinly sliced, deep-fried banana crisps with a touch of salt',
            image_url: 'bananachips.jpeg',
            badge: 'Popular'
        },
        {
            id: 4,
            name: 'Samosa',
            price: 30,
            category: 'fried',
            description: 'Spiced potato-filled triangular pastry',
            image_url: 'samosa.jpeg'
        },
        {
            id: 5,
            name: 'Paneer Pakora',
            price: 140,
            category: 'fried',
            description: 'Gram flour-coated fried paneer cubes, crispy and delicious',
            image_url: 'paneerpakora.jpeg'
        },
        {
            id: 6,
            name: 'Kachori',
            price: 25,
            category: 'fried',
            description: 'Deep-fried disc with spicy lentil or onion filling',
            image_url: 'kachori.jpeg',
            badge: 'New'
        },
        // Baked Snacks
        {
            id: 7,
            name: 'Baked Thattai',
            price: 80,
            category: 'baked',
            description: 'Crisp rice flour discs baked for a healthier snack',
            image_url: 'thattai.jpeg',
            badge: 'Healthy'
        },
        {
            id: 8,
            name: 'Baked Khakhra',
            price: 100,
            category: 'baked',
            description: 'Crisp Gujarati-style baked wheat crackers, spiced to perfection',
            image_url: 'khakra.jpeg'
        },
        {
            id: 9,
            name: 'Ragi Chips',
            price: 150,
            category: 'baked',
            description: 'Baked finger millet chips with a spicy masala flavor',
            image_url: 'ragichips.jpeg',
            badge: 'Healthy'
        },
        {
            id: 10,
            name: 'Baked Samosa',
            price: 40,
            category: 'baked',
            description: 'Oven-cooked samosa with spiced potato filling',
            image_url: 'bakedsamosa.jpeg'
        },
        {
            id: 11,
            name: 'Baked Mathri',
            price: 50,
            category: 'baked',
            description: 'Spiced, flaky wheat crackers baked for a lighter snack',
            image_url: 'mathri.jpeg'
        },
        {
            id: 12,
            name: 'Masala Breadsticks',
            price: 65,
            category: 'baked',
            description: 'North Indian masala-flavored baked breadsticks',
            image_url: 'masalabreadsticks.jpeg',
            badge: 'New'
        },
        // Namkeen
        {
            id: 13,
            name: 'Mixture',
            price: 45,
            category: 'namkeen',
            description: 'Southern-style namkeen with boondi and nuts',
            image_url: 'mixture.jpeg',
            badge: 'Popular'
        },
        {
            id: 14,
            name: 'Omapodi',
            price: 80,
            category: 'namkeen',
            description: 'Spiced sev made with ajwain, a South Indian savory delight',
            image_url: 'omapodi.jpg'
        },
        {
            id: 15,
            name: 'Sundal',
            price: 50,
            category: 'namkeen',
            description: 'Stir-fried legumes with mustard, curry leaves, and coconut',
            image_url: 'sundal.jpeg'
        },
        {
            id: 16,
            name: 'Aloo Bhujia',
            price: 20,
            category: 'namkeen',
            description: 'Spicy potato-based sev, a classic North Indian namkeen',
            image_url: 'aloobhujiya.jpeg',
            badge: 'Popular'
        },
        {
            id: 17,
            name: 'Chivda',
            price: 85,
            category: 'namkeen',
            description: 'Spiced poha mix with peanuts, a light and crunchy snack',
            image_url: 'chivda.jpeg'
        },
        {
            id: 18,
            name: 'Moong Dal',
            price: 40,
            category: 'namkeen',
            description: 'Salted, fried split moong beans, a North Indian favorite',
            image_url: 'moongdal.jpeg'
        },
        // Sweet Snacks
        {
            id: 19,
            name: 'Mysore Pak',
            price: 200,
            category: 'sweet',
            description: 'Ghee-rich chickpea flour sweet, a melt-in-the-mouth delight',
            image_url: 'mysorepak.jpeg',
            badge: 'New'
        },
        {
            id: 20,
            name: 'Adirasam',
            price: 150,
            category: 'sweet',
            description: 'Deep-fried rice flour and jaggery sweet, a festive treat',
            image_url: 'adirasam.jpeg'
        },
        {
            id: 21,
            name: 'Kozhukattai',
            price: 160,
            category: 'sweet',
            description: 'Steamed rice dumpling with sweet coconut-jaggery filling',
            image_url: 'kozhukattai.jpeg'
        },
        {
            id: 22,
            name: 'Jalebi',
            price: 140,
            category: 'sweet',
            description: 'Syrupy deep-fried spirals, a sweet North Indian favorite',
            image_url: 'jalebi.jpeg'
        },
        {
            id: 23,
            name: 'Gujiya',
            price: 160,
            category: 'sweet',
            description: 'Deep-fried dumpling with khoya and dry fruit',
            image_url: 'gujiya.jpeg'
        },
        {
            id: 24,
            name: 'Besan Ladoo',
            price: 189,
            category: 'sweet',
            description: 'Round sweet made from gram flour and ghee',
            image_url: 'besan ladoo.jpeg',
            badge: 'Bestseller'
        },
        // Street Food
        {
            id: 25,
            name: 'Sundal Chaat',
            price: 70,
            category: 'street',
            description: 'Chickpea or moong-based tangy South Indian salad',
            image_url: 'sundalchaat.jpeg'
        },
        {
            id: 26,
            name: 'Idli Chaat',
            price: 50,
            category: 'street',
            description: 'Masala-spiced cut idlis with chutneys',
            image_url: 'idlichaat.jpeg'
        },
        {
            id: 27,
            name: 'Vada Pav',
            price: 50,
            category: 'street',
            description: 'Spicy potato vada in a bun, a Mumbai favorite',
            image_url: 'vadapav.jpeg'
        },
        {
            id: 28,
            name: 'Pani Puri Kit',
            price: 60,
            category: 'street',
            description: 'Crispy puris with spicy tamarind water and fillings',
            image_url: 'panipuri.jpeg',
            badge: 'Popular'
        },
        {
            id: 29,
            name: 'Aloo Tikki Chaat',
            price: 59,
            category: 'street',
            description: 'Mashed potato patties with curd and chutneys',
            image_url: 'alootikkichaat.jpeg'
        },
        {
            id: 30,
            name: 'Pav Bhaji',
            price: 55,
            category: 'street',
            description: 'Spicy mashed veggie curry with buttered buns',
            image_url: 'pavbhaji.jpeg'
        }
    ];

    const productsContainer = document.getElementById('combo-products');
    const summaryItems = document.getElementById('summary-items');
    const comboTotal = document.getElementById('combo-total');
    const addComboButton = document.getElementById('add-combo-to-cart');
    const searchInput = document.getElementById('combo-search');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    document.body.appendChild(successMessage);

    function showSuccessMessage(message) {
        successMessage.textContent = message;
        successMessage.style.transform = 'translateX(0)';
        setTimeout(() => {
            successMessage.style.transform = 'translateX(150%)';
        }, 3000);
    }

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
        let filtered = products.filter(product => {
            const categoryMatch = category === 'all' || product.category === category;
            const searchMatch = searchLower === '' ||
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower);
            return categoryMatch && searchMatch;
        });
        filtered.forEach(product => {
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
        comboTotal.textContent = `₹${total.toFixed(2)}`;
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
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            id: Date.now(),
            combo_items: combo,
            quantity: 1,
            name: `Custom Combo (${combo.map(item => item.name).join(', ')})`,
            price: combo.reduce((sum, item) => sum + item.price * item.quantity, 0)
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showSuccessMessage('Your combo is ready! Redirecting to checkout...');
        combo = [];
        renderSummary();
        renderProducts();
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 2000);
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