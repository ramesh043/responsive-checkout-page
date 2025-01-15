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
        const cartItemsList = document.getElementById('cart-items-list');
        cartItemsList.innerHTML = '';
        
        items.forEach(item => {
            const cartItemRow = document.createElement('tr');
            
            cartItemRow.innerHTML = `
                <td>
                <div>
                    <img src="${item.image}" alt="${item.title}" style="width: 70px;border-radius:10px">
                   <p style="font-size:12px">${item.title}</p>
                   </>
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























