// Selects all "Add to Cart" buttons
const addProducts = document.getElementsByClassName('add-product');

// Selects the cart <ul>
const cart = document.getElementById('cart');

// Selects the totalPrice and calculates all the items in the cart
const totalPrice = document.getElementById('total-price');

function updateTotal() {
    console.log("updateTotal is running");
    let total = 0;

    for (let i = 0; i < cartItems.length; i++) {
        total += cartItems[i].subtotal;
    }

    console.log(cartItems);
    console.log("Current total:", total);

    totalPrice.textContent = total.toFixed(2);
}

// Creates an empty array to store cart objects
const cartItems = [];

// Loops through all of the "Add to Cart" buttons
for (let i = 0; i < addProducts.length; i++) {

    // Listens for a click on each "Add to Cart" button
    addProducts[i].addEventListener('click', function(event) {

        // Finds the fruit card containing the clicked button
        const fruit = event.target.parentElement;

        // Gets the quantity input from the fruit card
        const amount = fruit.querySelector('.product-amount');
        console.log(amount.value);

        // Gets the fruit ID
        const fruitId = fruit.id;
        console.log(fruitId);

        // Finds the first <p>, which contains the fruit name
        const fruitName = fruit.querySelector('p');
        console.log(fruitName);

        // Gets the fruit name as text
        const name = fruitName.textContent;
        console.log(name);

        // Finds the element containing the fruit price
        const fruitPrice = fruit.querySelector('.price');
        const individualPrice = fruitPrice.textContent;
        console.log(individualPrice);

        // Gets and converts the price to a number
        const price = Number(individualPrice);

        // Converts the quantity to a number
        const quanNum = Number(amount.value);

       // Checks if the quantity is 0
      if (quanNum === 0) {
      alert("Please enter a quantity greater than 0.");
      return;
      }
        // Calculates the subtotal
        const subTotal = price * quanNum;
        console.log(subTotal);

        // Creates the cart object
        const cartItem = {
            id: fruitId,
            name: name,
            price: price,
            quantity: quanNum,
            subtotal: subTotal
        };

        // Saves the cart object to the cartItems array
        cartItems.push(cartItem);

        // Resets the product amount input
        amount.value = 0;

        // Updates total after adding item
        updateTotal();

        // Creates a <li> dynamically
        const cartListItem = document.createElement('li');

        // Gives the <li> the cart-item class
        cartListItem.classList.add('cart-item');

        // Creates a span for the cart item details
        const cartItemDetails = document.createElement('span');

        // Gives the span its content
        cartItemDetails.textContent =
            `${name} : ${quanNum} × $${price} = $${subTotal.toFixed(2)}`;

        // Creates the minus button
        const minusButton = document.createElement('button');

        // Gives the minus button its text
        minusButton.textContent = '−';

        // Creates the quantity display
        const quantityDisplay = document.createElement('span');

        quantityDisplay.textContent = quanNum;

        // Creates the plus button
        const plusButton = document.createElement('button');

        // Gives the plus button its text
        plusButton.textContent = '+';

        // Creates the Remove button
        const removeButton = document.createElement('button');

        // Gives the button its text
        removeButton.textContent = 'Remove';

        // Listens for clicks on the plus button
        plusButton.addEventListener('click', function() {

            // Only increase the quantity if it is less than 10
            if (cartItem.quantity < 10) {

                // Increases the quantity by 1
                cartItem.quantity = cartItem.quantity + 1;

                // Recalculates the subtotal
                cartItem.subtotal = cartItem.price * cartItem.quantity;

                // Updates the quantity displayed in the cart
                quantityDisplay.textContent = cartItem.quantity;

                // Updates the cart item details
                cartItemDetails.textContent =
                    `${cartItem.name} : ${cartItem.quantity} × $${cartItem.price} = $${cartItem.subtotal.toFixed(2)}`;

                // Updates the overall cart total
                updateTotal();

                // Shows the new subtotal in the console
                console.log("New subtotal:", cartItem.subtotal);
            }
        });

        // Listens for clicks on the minus button
        minusButton.addEventListener('click', function() {

            // Only decrease the quantity if it is greater than 0
            if (cartItem.quantity > 0) {

                // Decreases the quantity by 1
                cartItem.quantity = cartItem.quantity - 1;

                // Recalculates the subtotal
                cartItem.subtotal = cartItem.price * cartItem.quantity;

                // Updates the quantity displayed in the cart
                quantityDisplay.textContent = cartItem.quantity;

                // Updates the cart item details
                cartItemDetails.textContent =
                    `${cartItem.name} : ${cartItem.quantity} × $${cartItem.price} = $${cartItem.subtotal.toFixed(2)}`;

                // Updates the overall cart total
                updateTotal();

                // Shows the new subtotal in the console
                console.log("New subtotal:", cartItem.subtotal);
            }
        });

        // Tells the Remove button what to do when clicked
        removeButton.addEventListener('click', function() {

            // Finds the position of this fruit in the cartItems array
            const itemIndex = cartItems.findIndex(function(item) {
                return item.id === fruitId;
            });

            // Removes the cart object from the array
            cartItems.splice(itemIndex, 1);

            // Updates the total after removing the item
            updateTotal();

            // Removes the <li> from the page
            cartListItem.remove();

            // Shows the updated array in the console
            console.log(cartItems);
        });

        // Adds the item details to the <li>
        cartListItem.appendChild(cartItemDetails);

        // Adds the minus button to the <li>
        cartListItem.appendChild(minusButton);

        // Adds the quantity display to the <li>
        cartListItem.appendChild(quantityDisplay);

        // Adds the plus button to the <li>
        cartListItem.appendChild(plusButton);

        // Adds the Remove button to the <li>
        cartListItem.appendChild(removeButton);

        // Adds the <li> to the cart <ul>
        cart.appendChild(cartListItem);

        // Shows the cart's HTML in the console
        console.log(cart.innerHTML);

        // Shows the newly created <li> in the console
        console.log(cartListItem);
    });
}