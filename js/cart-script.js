// Cart array to hold items

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

// Function to render cart items in the cart.html table
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear the container

    cart.forEach(item => {
        console.log(item.id);
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" class="img-fluid me-5 rounded-circle"
                        style="width: 80px; height: 80px;" alt="">
                </div>
            </th>
            <td>
                <p class="mb-0 mt-4">${item.name}</p>
            </td>
            <td>
                <p class="mb-0 mt-4">${item.price} $</p>
            </td>
            <td>
                <div class="input-group quantity mt-4" style="width: 100px;">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-minus rounded-circle bg-light border cart-minus-btn" data-product-id="${item.id}">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                    <input type="text" class="form-control form-control-sm text-center border-0 cart-quantity" data-product-id="${item.id}" value="${item.quantity}">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-plus rounded-circle bg-light border cart-plus-btn" data-product-id="${item.id}">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td>
                <p class="mb-0 mt-4">${(item.price * item.quantity).toFixed(2)} $</p>
            </td>
            <td>
                <button class="btn btn-md rounded-circle bg-light border mt-4 remove-from-cart-btn" data-product-id="${item.id}">
                    <i class="fa fa-times text-danger"></i>
                </button>
            </td>
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



// Function to handle removing items from the cart
function handleRemoveFromCart(event) {
    const productId = event.currentTarget.getAttribute('data-product-id');
    console.log(`Removing item with ID: ${productId}`);

    // Filter out the item to be removed
    cart = cart.filter(item => item.id != productId);

    // Update the cart in local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Render the updated cart items
    renderCartItems();
}

// Function to handle quantity change directly in the input field
function handleQuantityChange(event) {
    const productId = event.target.getAttribute('data-product-id');
    const newQuantity = parseInt(event.target.value);

    console.log(`Changing quantity of item with ID: ${productId} to ${newQuantity}`);
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
    const productId = event.currentTarget.getAttribute('data-product-id');
    const cartItem = cart.find(item => item.id == productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;

        console.log(`Decreasing quantity of item with ID: ${productId} to ${cartItem.quantity}`);
        // Save the cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    renderCartItems();
}

// Function to handle quantity increase using the plus button
function handlePlusQuantity(event) {
    const productId = event.currentTarget.getAttribute('data-product-id');
    const cartItem = cart.find(item => item.id == productId);
    if (cartItem) {
        cartItem.quantity += 1;

        console.log(`Increasing quantity of item with ID: ${productId} to ${cartItem.quantity}`);
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

