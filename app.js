class ProductManager {
    constructor() {
        this.products = [
            {
                id: 'tpu-slides',
                name: 'TPU Slides',
                description: 'Comfortable 3D Printed TPU Slides',
                basePrice: 49.99,
                colors: ['Black', 'White', 'Blue', 'Red'],
                sizes: [6, 7, 8, 9, 10, 11, 12],
                images: [
                    'slides-1.jpg',
                    'slides-2.jpg',
                    'slides-3.jpg'
                ]
            }
        ];
        this.cart = [];
        this.initEventListeners();
    }

    initEventListeners() {
        this.setupProductSlider();
        this.setupProductDetail();
        this.setupCartSystem();
    }

    setupProductSlider() {
        const sliderContainer = document.querySelector('.slider-container');
        const prevButton = document.querySelector('.prev-slide');
        const nextButton = document.querySelector('.next-slide');

        this.products.forEach(product => {
            const slide = document.createElement('div');
            slide.classList.add('product-slide');
            slide.innerHTML = `
                <img src="${product.images[0]}" alt="${product.name}">
                <h2>${product.name}</h2>
                <button data-product-id="${product.id}" class="view-product">View Details</button>
            `;
            sliderContainer.appendChild(slide);
        });

        // Slider navigation logic would be added here
        prevButton.addEventListener('click', () => this.navigateSlider('prev'));
        nextButton.addEventListener('click', () => this.navigateSlider('next'));

        // Product detail navigation
        document.querySelectorAll('.view-product').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                this.showProductDetail(productId);
            });
        });
    }

    navigateSlider(direction) {
        // Implement slider navigation logic
    }

    showProductDetail(productId) {
        const product = this.products.find(p => p.id === productId);
        const detailSection = document.getElementById('product-detail');
        const mainImage = detailSection.querySelector('.main-product-image');
        const thumbnails = detailSection.querySelector('.thumbnail-images');
        const colorSelector = detailSection.querySelector('.color-selector');
        const sizeSelector = detailSection.querySelector('.size-selector');

        // Set main details
        detailSection.querySelector('#product-title').textContent = product.name;
        detailSection.querySelector('#product-description').textContent = product.description;
        detailSection.querySelector('#product-price-value').textContent = product.basePrice.toFixed(2);

        // Set main image
        mainImage.src = product.images[0];

        // Create thumbnail images
        thumbnails.innerHTML = '';
        product.images.forEach(img => {
            const thumb = document.createElement('img');
            thumb.src = img;
            thumb.addEventListener('click', () => {
                mainImage.src = img;
            });
            thumbnails.appendChild(thumb);
        });

        // Create color selector
        colorSelector.innerHTML = '<h3>Color</h3>';
        product.colors.forEach(color => {
            const colorOption = document.createElement('div');
            colorOption.classList.add('color-option');
            colorOption.textContent = color;
            colorOption.dataset.color = color;
            colorSelector.appendChild(colorOption);
        });

        // Create size selector
        sizeSelector.innerHTML = '<h3>Size</h3>';
        product.sizes.forEach(size => {
            const sizeOption = document.createElement('div');
            sizeOption.classList.add('size-option');
            sizeOption.textContent = size;
            sizeOption.dataset.size = size;
            sizeSelector.appendChild(sizeOption);
        });

        // Show product detail section
        document.getElementById('home').classList.add('hidden');
        detailSection.classList.remove('hidden');
    }

    setupProductDetail() {
        const addToCartBtn = document.getElementById('add-to-cart');
        const colorOptions = document.querySelectorAll('.color-option');
        const sizeOptions = document.querySelectorAll('.size-option');

        let selectedColor = null;
        let selectedSize = null;

        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                selectedColor = option.dataset.color;
            });
        });

        sizeOptions.forEach(option => {
            option.addEventListener('click', () => {
                sizeOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                selectedSize = option.dataset.size;
            });
        });

        addToCartBtn.addEventListener('click', () => {
            if (selectedColor && selectedSize) {
                this.addToCart({
                    color: selectedColor,
                    size: selectedSize
                });
            } else {
                alert('Please select color and size');
            }
        });
    }

    addToCart(options) {
        const product = this.products[0]; // Currently only one product
        const cartItem = {
            ...product,
            ...options,
            quantity: 1
        };

        this.cart.push(cartItem);
        this.updateCartUI();
    }

    setupCartSystem() {
        const cartIcon = document.querySelector('.cart-icon');
        const cartSection = document.getElementById('cart');
        const checkoutBtn = document.getElementById('checkout-btn');

        cartIcon.addEventListener('click', () => {
            document.getElementById('home').classList.add('hidden');
            document.getElementById('product-detail').classList.add('hidden');
            cartSection.classList.remove('hidden');
        });

        checkoutBtn.addEventListener('click', () => {
            // Implement checkout logic
            alert('Checkout functionality coming soon!');
        });
    }

    updateCartUI() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total-value');

        cartItemsContainer.innerHTML = '';
        let total = 0;

        this.cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.name} - ${item.color}, Size ${item.size}</span>
                <span>$${item.basePrice.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            total += item.basePrice;
        });

        cartCount.textContent = this.cart.length;
        cartTotal.textContent = total.toFixed(2);
    }
}

// Initialize the product manager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ProductManager();
});
