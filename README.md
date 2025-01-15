
# Responsive Cart Page

This project is a responsive checkout cart page built using HTML, CSS, and JavaScript. The cart items are dynamically loaded from a provided JSON API. The page is designed to be mobile-friendly and adaptable to various screen sizes.

Features
Dynamic loading of cart items from a JSON API.
Responsive design for mobile, tablet, and desktop views.
Quantity update feature for cart items.
Remove item feature with a trash icon.
Calculation of subtotal and total prices.
Beautiful UI for checkout success message using a modal.


## Demo

Insert gif or link to demo

https://responsive-checkout-cart-page.netlify.app/
## Tech Stack

**Client:** HTML, CSS, JavaScript




## Html code

 ``` Html
    

    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Cart Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="logo">Logo</div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#"><img src="cart-icon.png" alt="Cart"></a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="cart-container">
            <div class="cart-items">
                <h1>Shopping Cart</h1>
                <table id="cart-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="cart-items-list"></tbody>
                </table>
            </div>
            <div class="cart-totals">
                <h2>Cart Totals</h2>
                <div class="totals">
                    <p>Subtotal: <span id="subtotal"></span></p>
                    <p>Total: <span id="total"></span></p>
                    <button id="checkout-button">Check Out</button>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="service-icons">
            <div>High Quality</div>
            <div>Warranty Protection</div>
            <!-- Add more service icons as needed -->
        </div>
    </footer>

    <!-- Modal Structure -->
    <div id="checkout-modal" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Checkout Successful!</h2>
            <p>Thank you for your purchase. Your order has been placed successfully.</p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
 ```


## CSS stylesheet
 ``` css 
  
/* styles.css */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

header {
    background: #333;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

header .logo {
    font-size: 24px;
}

header nav ul {
    list-style: none;
    display: flex;
    gap: 15px;
}

header nav ul li a {
    color: #fff;
    text-decoration: none;
}

.cart-container {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
}

.cart-items, .cart-totals {
    flex: 1;
    min-width: 300px;
    margin: 10px;
}

.cart-items h1, .cart-totals h2 {
    margin-bottom: 20px;
}

.cart-items table {
    width: 100%;
    border-collapse: collapse;
}

.cart-items th, .cart-items td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.cart-items th {
    background-color: #f2f2f2;
}

.cart-item-details h3 {
    margin: 0;
    font-size: 16px;
}

.cart-item-actions input[type="number"] {
    width: 50px;
}

.cart-item-actions button {
    background: none;
    border: none;
    cursor: pointer;
}

footer {
    background: #f1f1f1;
    padding: 20px;
    text-align: center;
}

.service-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
}

/* Modal Styles */
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    text-align: center;
}

.close-button {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close-button:hover,
.close-button:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

/* Responsive Styles */
@media (max-width: 768px) {
    .cart-container {
        flex-direction: column;
    }
}

 ```

## JavaScript code

```javascript
// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.getElementById('cart-items-list');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.getElementById('checkout-button');
    const modal = document.getElementById('checkout-modal');
    const closeButton = document.querySelector('.close-button');

    const apiUrl = 'https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889';

    async function fetchCartData() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    }

    function updateCartTotals(items) {
        let subtotal = 0;
        items.forEach(item => {
            subtotal += item.line_price;
        });
        subtotalElement.textContent = `₹${(subtotal / 100).toFixed(2)}`;
        totalElement.textContent = `₹${(subtotal / 100).toFixed(2)}`;
    }

    function renderCartItems(items) {
        cartItemsList.innerHTML = '';
        items.forEach(item => {
            const cartItemRow = document.createElement('tr');
            
            cartItemRow.innerHTML = `
                <td>
                    <img src="${item.image}" alt="${item.title}" style="width: 50px;">
                    <div class="cart-item-details">
                        <h3>${item.title}</h3>
                    </div>
                </td>
                <td>₹${(item.price / 100).toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1">
                </td>
                <td>₹<span class="item-subtotal">${(item.line_price / 100).toFixed(2)}</span></td>
                <td>
                    <button class="remove-item"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            
            const quantityInput = cartItemRow.querySelector('input[type="number"]');
            const removeButton = cartItemRow.querySelector('.remove-item');
            const itemSubtotalElem = cartItemRow.querySelector('.item-subtotal');

            quantityInput.addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                item.quantity = newQuantity;
                item.line_price = item.price * newQuantity;
                itemSubtotalElem.textContent = (item.line_price / 100).toFixed(2);
                updateCartTotals(items);
            });

            removeButton.addEventListener('click', () => {
                const index = items.indexOf(item);
                items.splice(index, 1);
                renderCartItems(items);
                updateCartTotals(items);
            });

            cartItemsList.appendChild(cartItemRow);
        });
    }

    async function initCart() {
        const cartData = await fetchCartData();
        if (cartData && cartData.items) {
            renderCartItems(cartData.items);
            updateCartTotals(cartData.items);
        }
    }

    initCart();

    checkoutButton.addEventListener('click', () => {
        // Clear the cart
        cartItemsList.innerHTML = '';
        subtotalElement.textContent = '₹0.00';
        totalElement.textContent = '₹0.00';

        // Show the modal
        modal.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
```

## Deployment on Netlify

To deploy this project on Netlify, follow these 

1. ** link **
   - Go to [Netlify](https://responsive-checkout-cart-page.netlify.app/).
   

## Authors

- [@ramesh043](https://github.com/ramesh043/responsive-checkout-page)

Author
Name: Ramesh
GitHub: ramesh043
