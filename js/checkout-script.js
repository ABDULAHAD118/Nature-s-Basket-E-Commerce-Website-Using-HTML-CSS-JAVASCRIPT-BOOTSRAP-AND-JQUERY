
// Flat rate shipping cost
const shippingCost = 3.00;

// Function to calculate and update the cart total
function calculateCartTotal() {
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const total = subtotal + shippingCost;

    // Update the cart total in the HTML
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

// Function to render cart items in the cart table
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear the container

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">
                <div class="d-flex align-items-center mt-2">
                    <img src="${item.image}" class="img-fluid rounded-circle" style="width: 90px; height: 90px;" alt="">
                </div>
            </th>
            <td class="py-5">${item.name}</td>
            <td class="py-5">$${item.price.toFixed(2)}</td>
            <td class="py-5">${item.quantity}</td>
            <td class="py-5">$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });

    // Add event listeners to the remove buttons
    document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
        button.addEventListener('click', handleRemoveFromCart);
    });

    // Add event listeners to the minus buttons
    document.querySelectorAll('.cart-minus-btn').forEach(button => {
        button.addEventListener('click', handleMinusQuantity);
    });

    // Add event listeners to the plus buttons
    document.querySelectorAll('.cart-plus-btn').forEach(button => {
        button.addEventListener('click', handlePlusQuantity);
    });

    // Add event listeners to the quantity inputs
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', handleQuantityChange);
    });

    // Calculate and update the cart total
    calculateCartTotal();
}

// Function to handle adding items to the cart
function handleAddToCart(event) {
    event.preventDefault(); // Prevent default link behavior

    const productId = event.target.getAttribute('data-product-id');
    const productName = event.target.getAttribute('data-product-name');
    const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
    const productImage = event.target.getAttribute('data-product-image');

    const cartItem = cart.find(item => item.id == productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1, image: productImage });
    }

    // Save the cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    renderCartItems();
}

// Function to handle removing items from the cart
function handleRemoveFromCart(event) {
    const productId = event.target.getAttribute('data-product-id');
    cart = cart.filter(item => item.id != productId);

    // Save the cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    renderCartItems();
}

// Function to handle quantity change directly in the input field
function handleQuantityChange(event) {
    const productId = event.target.getAttribute('data-product-id');
    const newQuantity = parseInt(event.target.value);

    const cartItem = cart.find(item => item.id == productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;

        // Save the cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    renderCartItems();
}

// Function to handle quantity decrease using the minus button
function handleMinusQuantity(event) {
    const productId = event.target.getAttribute('data-product-id');
    const cartItem = cart.find(item => item.id == productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;

        // Save the cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    renderCartItems();
}

// Function to handle quantity increase using the plus button
function handlePlusQuantity(event) {
    const productId = event.target.getAttribute('data-product-id');
    const cartItem = cart.find(item => item.id == productId);
    if (cartItem) {
        cartItem.quantity += 1;

        // Save the cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    renderCartItems();
}

// Load the cart from local storage on page load
window.addEventListener('load', () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    renderCartItems();
});

// Add event listeners to the add-to-cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', handleAddToCart);
});

// Add event listener to shipping options to recalculate the total when changed
document.querySelectorAll('input[name="shipping"]').forEach(option => {
    option.addEventListener('change', calculateCartTotal);
});
