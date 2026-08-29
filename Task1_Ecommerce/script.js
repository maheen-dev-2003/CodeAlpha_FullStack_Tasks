JavaScript
// Sample Products Data
const products = [
    { id: 1, name: "Wireless Headphones", price: 49, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { id: 2, name: "Smart Watch", price: 89, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
    { id: 3, name: "Gaming Mouse", price: 29, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300" },
    { id: 4, name: "Mechanical Keyboard", price: 79, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300" }
];

let cart = [];

// Display Products on Page
function loadProducts() {
    const grid = document.getElementById('product-list');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Add Item to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCartUI();
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update Cart Display & Total
function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalSpan = document.getElementById('total-price');
    const countSpan = document.getElementById('cart-count');

    countSpan.innerText = cart.length;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        totalSpan.innerText = '0';
        return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong>
                <br><small>$${item.price}</small>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalSpan.innerText = total;
}

// Process Order (Order Processing Feature)
function processOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add items to place an order.");
        return;
    }

    const orderId = Math.floor(100000 + Math.random() * 900000);
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    alert(`🎉 Order Placed Successfully!\n\nOrder ID: #${orderId}\nTotal Amount: $${total}\n\nThank you for shopping with CodeAlpha!`);

    cart = [];
    updateCartUI();
}

// Run when page loads
loadProducts();
