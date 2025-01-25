const products = [
    {
        id: 1,
        name: 'Premium Smartphone',
        price: 999,
        description: 'The ultimate mobile experience with pro-grade camera system.',
        colors: ['#1d1d1f', '#e3e3e3', '#0071e3'],
        storage: ['128GB', '256GB', '512GB'],
        images: [
            'https://placehold.co/600x400/1d1d1f/fff?text=Phone+Black',
            'https://placehold.co/600x400/e3e3e3/000?text=Phone+White',
            'https://placehold.co/600x400/0071e3/fff?text=Phone+Blue'
        ]
    },
    {
        id: 2,
        name: 'High-Performance Laptop',
        price: 1999,
        description: 'Next-level computing power in a sleek design.',
        colors: ['#1d1d1f', '#e3e3e3'],
        storage: ['512GB', '1TB', '2TB'],
        images: [
            'https://placehold.co/600x400/1d1d1f/fff?text=Laptop+Space+Gray',
            'https://placehold.co/600x400/e3e3e3/000?text=Laptop+Silver'
        ]
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;

function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.images[0]}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price}</p>
            <button class="nav-link" onclick="showProductModal(${product.id})">View Details</button>
        </div>
    `).join('');
}

function showProductModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    const modal = document.getElementById('product-modal');
    modal.style.display = 'flex';
    
    document.getElementById('product-title').textContent = currentProduct.name;
    document.getElementById('product-price').textContent = `$${currentProduct.price}`;
    document.getElementById('product-description').textContent = currentProduct.description;
    
    const gallery = document.getElementById('modal-gallery');
    gallery.innerHTML = currentProduct.images.map(img => `
        <img src="${img}" class="product-image" alt="${currentProduct.name}">
    `).join('');
    
    renderColorOptions();
    renderStorageOptions();
}

function renderColorOptions() {
    const container = document.getElementById('color-selector');
    container.innerHTML = currentProduct.colors.map((color, index) => `
        <div class="color-option ${index === 0 ? 'selected' : ''}" 
             style="background-color: ${color}"
             data-color="${color}"
             onclick="selectColor(this)"></div>
    `).join('');
}

function selectColor(element) {
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    const color = element.dataset.color;
    // Update gallery based on color selection
    const gallery = document.getElementById('modal-gallery');
    gallery.innerHTML = currentProduct.images.map(img => 
        img.replace(/\/[^/]+(?=\/[^/]+$)/, `/${color.replace('#', '')}`)
    ).map(img => `
        <img src="${img}" class="product-image" alt="${currentProduct.name}">
    `).join('');
}

function renderStorageOptions() {
    const container = document.getElementById('storage-selector');
    container.innerHTML = currentProduct.storage.map((storage, index) => `
        <div class="storage-option ${index === 0 ? 'selected' : ''}"
             onclick="selectStorage(this)"
             data-storage="${storage}">${storage}</div>
    `).join('');
}

function selectStorage(element) {
    document.querySelectorAll('.storage-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

document.getElementById('add-to-cart').addEventListener('click', () => {
    const color = document.querySelector('.color-option.selected').dataset.color;
    const storage = document.querySelector('.storage-option.selected').dataset.storage;
    
    cart.push({
        ...currentProduct,
        selectedColor: color,
        selectedStorage: storage
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeModal();
});

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

function closeModal() {
    document.getElementById('product-modal').style.display = 'none';
}

// Event listeners
document.querySelector('.close-modal').addEventListener('click', closeModal);
document.getElementById('product-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('product-modal')) closeModal();
});

// Cart functionality
document.querySelector('.nav-link[href="#"]:last-child').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('cart-sidebar').classList.add('active');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('active');
});

// Initial setup
renderProducts();
updateCartCount();
