
function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}


function addToCart(title, author, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ title, author, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("Added to Cart!");
}
