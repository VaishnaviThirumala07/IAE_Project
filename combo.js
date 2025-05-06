// Mock product data (same as index.html)
const products = [
    // Fried Snacks
    { id: 'Medu Vada', name: 'Medu Vada', price: 50, category: 'fried', description: 'Savory donut-shaped fritter made from urad dal, perfect for a crispy snack.', img: 'meduvada.jpeg', badge: 'Bestseller' },
    { id: 'Murukku', name: 'Murukku', price: 80, category: 'fried', description: 'Rice flour and lentil spiral snack, a South Indian favorite.', img: 'murukku.jpeg' },
    { id: 'Banana Chips', name: 'Banana Chips', price: 120, category: 'fried', description: 'Thinly sliced, deep-fried banana crisps with a touch of salt.', img: 'bananachips.jpeg', badge: 'Popular' },
    { id: 'Samosa', name: 'Samosa', price: 30, category: 'fried', description: 'Spiced potato-filled triangular pastry, a North Indian classic.', img: 'samosa.jpeg' },
    { id: 'Paneer Pakora', name: 'Paneer Pakora', price: 140, category: 'fried', description: 'Gram flour-coated fried paneer cubes, crispy and delicious.', img: 'paneerpakora.jpeg' },
    { id: 'Kachori', name: 'Kachori', price: 25, category: 'fried', description: 'Deep-fried disc with spicy lentil or onion filling.', img: 'kachori.jpeg', badge: 'New' },
    // Baked Snacks
    { id: 'Baked Thattai', name: 'Baked Thattai', price: 80, category: 'baked', description: 'Crisp rice flour discs baked for a healthier South Indian snack.', img: 'thattai.jpeg', badge: 'Healthy' },
    { id: 'Baked Khakhra', name: 'Baked Khakhra', price: 100, category: 'baked', description: 'Crisp Gujarati-style baked wheat crackers, spiced to perfection.', img: 'khakra.jpeg' },
    { id: 'Ragi Chips', name: 'Ragi Chips', price: 150, category: 'baked', description: 'Baked finger millet chips with a spicy masala flavor, guilt-free snacking.', img: 'ragichips.jpeg', badge: 'Healthy' },
    { id: 'Baked Samosa', name: 'Baked Samosa', price: 40, category: 'baked', description: 'Oven-cooked samosa with spiced potato filling, a healthier North Indian treat.', img: 'bakedsamosa.jpeg' },
    { id: 'Baked Mathri', name: 'Baked Mathri', price: 50, category: 'baked', description: 'Spiced, flaky wheat crackers baked for a lighter North Indian snack.', img: 'mathri.jpeg' },
    { id: 'Masala Breadsticks', name: 'Masala Breadsticks', price: 65, category: 'baked', description: 'North Indian masala-flavored baked breadsticks, perfect for snacking.', img: 'masalabreadsticks.jpeg', badge: 'New' },
    // Namkeen
    { id: 'Mixture', name: 'Mixture', price: 45, category: 'namkeen', description: 'Southern-style namkeen with boondi, nuts, and curry leaves.', img: 'mixture.jpeg', badge: 'Popular' },
    { id: 'Omapodi', name: 'Omapodi', price: 80, category: 'namkeen', description: 'Spiced sev made with ajwain, a South Indian savory delight.', img: 'omapodi.jpg' },
    { id: 'Sundal', name: 'Sundal', price: 50, category: 'namkeen', description: 'Stir-fried legumes with mustard, curry leaves, and coconut.', img: 'sundal.jpeg' },
    { id: 'Aloo Bhujia', name: 'Aloo Bhujia', price: 20, category: 'namkeen', description: 'Spicy potato-based sev, a classic North Indian namkeen.', img: 'aloobhujiya.jpeg', badge: 'Popular' },
    { id: 'Chivda', name: 'Chivda', price: 85, category: 'namkeen', description: 'Spiced poha mix with peanuts, a light and crunchy snack.', img: 'chivda.jpeg' },
    { id: 'Moong Dal', name: 'Moong Dal', price: 40, category: 'namkeen', description: 'Salted, fried split moong beans, a North Indian favorite.', img: 'moongdal.jpeg' },
    // Sweet Snacks
    { id: 'Mysore Pak', name: 'Mysore Pak', price: 200, category: 'sweet', description: 'Ghee-rich chickpea flour sweet, a melt-in-the-mouth South Indian delight.', img: 'mysorepak.jpeg', badge: 'New' },
    { id: 'Adirasam', name: 'Adirasam', price: 150, category: 'sweet', description: 'Deep-fried rice flour and jaggery sweet, a South Indian festive treat.', img: 'adirasam.jpeg' },
    { id: 'Kozhukattai', name: 'Kozhukattai', price: 160, category: 'sweet', description: 'Steamed rice dumpling with sweet coconut-jaggery filling.', img: 'kozhukattai.jpeg' },
    { id: 'Jalebi', name: 'Jalebi', price: 140, category: 'sweet', description: 'Syrupy deep-fried spirals, a sweet North Indian favorite.', img: 'jalebi.jpeg' },
    { id: 'Gujiya', name: 'Gujiya', price: 160, category: 'sweet', description: 'Deep-fried dumpling with khoya and dry fruit, a North Indian festive sweet.', img: 'gujiya.jpeg' },
    { id: 'Besan Ladoo', name: 'Besan Ladoo', price: 189, category: 'sweet', description: 'Round sweet made from gram flour and ghee, a North Indian classic.', img: 'besan ladoo.jpeg', badge: 'Bestseller' },
    // Street Food
    { id: 'Sundal Chaat', name: 'Sundal Chaat', price: 70, category: 'street', description: 'Chickpea or moong-based tangy South Indian salad with chutneys.', img: 'sundalchaat.jpeg' },
    { id: 'Idli Chaat', name: 'Idli Chaat', price: 50, category: 'street', description: 'Masala-spiced cut idlis with chutneys, a South Indian street food twist.', img: 'idlichaat.jpeg' },
    { id: 'Vada Pav', name: 'Vada Pav', price: 50, category: 'street', description: 'Spicy potato vada in a bun, a South Indian and Mumbai favorite.', img: 'vadapav.jpeg' },
    { id: 'Pani Puri Kit', name: 'Pani Puri Kit', price: 60, category: 'street', description: 'Crispy puris with spicy tamarind water and fillings for a North Indian street food experience.', img: 'panipuri.jpeg', badge: 'Popular' },
    { id: 'Aloo Tikki Chaat', name: 'Aloo Tikki Chaat', price: 59, category: 'street', description: 'Mashed potato patties with curd and chutneys, a North Indian street food delight.', img: 'alootikkichaat.jpeg' },
    { id: 'Pav Bhaji', name: 'Pav Bhaji', price: 55, category: 'street', description: 'Spicy mashed veggie curry with buttered buns, a North Indian street food classic.', img: 'pavbhaji.jpeg' }
];

// Initialize combo
let combo = [];

// DOM elements
const productsContainer = document.getElementById('combo-products');
const summaryItems = document.getElementById('summary-items');
const comboTotal = document.getElementById('combo-total');
const addComboButton = document.getElementById('add-combo-to-cart');
const searchInput = document.getElementById('combo-search');
const filterButtons = document.querySelectorAll('.filter-btn');

// Render products
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
                    <img src="${product.img}" alt="${product.name}" class="product-img">
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

    // Add event listeners for quantity controls
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

// Update combo
function updateCombo(productId, quantity) {
    const product = products.find(p => p.id === productId);
    const existingItem = combo.find(item => item.id === productId);

    if (existingItem) {
        if (quantity > 0) {
            existingItem.quantity = quantity;
        } else {
            combo = combo.filter(item => item.id !== productId);
        }
    } else if (quantity > 0) {
        combo.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    renderSummary();
}

// Render combo summary
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

    // Update total
    const total = combo.reduce((sum, item) => sum + item.price * item.quantity, 0);
    comboTotal.textContent = `₹${total}`;

    // Add event listeners for summary quantity inputs
    document.querySelectorAll('.summary-item-quantity').forEach(input => {
        input.addEventListener('change', () => {
            if (input.value < 0) input.value = 0;
            updateCombo(input.dataset.id, parseInt(input.value));
            // Update product card quantity
            const productInput = document.querySelector(`.quantity-input[data-id="${input.dataset.id}"]`);
            if (productInput) productInput.value = input.value;
        });
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.summary-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            updateCombo(btn.dataset.id, 0);
            // Reset product card quantity
            const productInput = document.querySelector(`.quantity-input[data-id="${btn.dataset.id}"]`);
            if (productInput) productInput.value = 0;
        });
    });
}

// Add combo to cart
addComboButton.addEventListener('click', () => {
    if (combo.length === 0) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const comboId = `COMBO_${Date.now()}`;
    const comboName = `Custom Snack Combo (${combo.map(item => item.name).join(', ')})`;
    const comboPrice = combo.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const comboImg = combo[0].img; // Use first item's image

    cart.push({
        id: comboId,
        name: comboName,
        price: comboPrice,
        img: comboImg,
        quantity: 1
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();

    // Show notification
    const notification = document.getElementById('cart-notification');
    notification.textContent = 'Combo added to cart!';
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);

    // Reset combo
    combo = [];
    renderSummary();
    renderProducts();
});

// Filter and search functionality
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

// Initialize
renderProducts();
renderSummary();

// Update cart count (from script.js)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
    
    // Add animation
    const cartCount = document.querySelector('.cart-count');
    cartCount.classList.add('animate__animated', 'animate__rubberBand');
    setTimeout(() => {
        cartCount.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
}