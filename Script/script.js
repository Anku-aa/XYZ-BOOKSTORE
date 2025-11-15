
if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
}


function addToCart(title, author, price, image) {

    let cart = JSON.parse(localStorage.getItem("cart"));

    cart.push({
        title: title,
        author: author,
        price: price,
        image: image
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    
    window.location.href = "cart.html";
}



function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let table = document.getElementById("cart-table");

    if (!table) return; // error hatane ke liye

    table.innerHTML = "";

    if (cart.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="5" align="center" style="padding:20px; font-size:18px;">
                    Your cart is empty
                </td>
            </tr>
        `;
        return;
    }

    cart.forEach((item, index) => {
        table.innerHTML += `
            <tr>
                <td><img src="${item.image}" width="70"></td>
                <td>${item.title}</td>
                <td>${item.author}</td>
                <td>${item.price}</td>
                <td>
                    <button class="remove-btn" onclick="removeItem(${index})">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}







function addToCartFromButton(btn) { // auto read wala hai

    let row = btn.parentElement.parentElement;  

    let image = row.cells[0].querySelector("img").src;
    let title = row.cells[1].innerText;
    let author = row.cells[2].innerText;
    let price = row.cells[3].innerText;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ title, author, price, image });

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("Added to Cart!");
}


