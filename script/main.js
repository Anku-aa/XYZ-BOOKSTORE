const booksData = [
    {
        id: 1,
        title: "Introduction to Computer Science",
        author: "Perry Donham",
        price: 550,
        image: "Images/a.jpg",
        category: "cse",
        rating: 4.5,
        reviews: 128,
        description: "A comprehensive introduction to computer science principles and programming fundamentals."
    },
    {
        id: 2,
        title: "Open Data Structure",
        author: "Pat Morin",
        price: 600,
        image: "Images/b.jpg",
        category: "cse",
        rating: 4.7,
        reviews: 95,
        description: "Learn about fundamental data structures and their implementations in modern programming."
    },
    {
        id: 3,
        title: "Computer Networking: Principles, Protocols",
        author: "Olivier Bonaventure",
        price: 500,
        image: "Images/c.jpg",
        category: "cse",
        rating: 4.6,
        reviews: 112,
        description: "Master networking concepts, protocols, and architectures for the modern internet."
    },
    {
        id: 4,
        title: "Computer Science One",
        author: "Chris Bourke",
        price: 550,
        image: "Images/d.png",
        category: "cse",
        rating: 4.4,
        reviews: 87,
        description: "Essential concepts in computer science with practical examples and exercises."
    },
    {
        id: 5,
        title: "Electronic Devices and Circuit Theory",
        author: "Robert L. Boylestad, Louis Nashelsky",
        price: 480,
        image: "Images/e.jpg",
        category: "ece",
        rating: 4.8,
        reviews: 156,
        description: "Comprehensive coverage of electronic devices and circuit analysis techniques."
    },
    {
        id: 6,
        title: "Digital Logic and Computer Design",
        author: "M. Morris Mano",
        price: 650,
        image: "Images/f.jpg",
        category: "ece",
        rating: 4.9,
        reviews: 203,
        description: "The classic text on digital logic design and computer organization."
    },
    {
        id: 7,
        title: "Communication Systems",
        author: "Simon Haykin",
        price: 700,
        image: "Images/g.jpg",
        category: "ece",
        rating: 4.7,
        reviews: 142,
        description: "In-depth study of analog and digital communication systems."
    },
    {
        id: 8,
        title: "Microprocessors and Interfacing",
        author: "Douglas V. Hall",
        price: 700,
        image: "Images/h.webp",
        category: "ece",
        rating: 4.6,
        reviews: 118,
        description: "Complete guide to microprocessor architecture and interfacing techniques."
    },
    {
        id: 9,
        title: "Electrical Machines",
        author: "P.S. Bimbhra",
        price: 620,
        image: "Images/i.png",
        category: "eee",
        rating: 4.5,
        reviews: 134,
        description: "Comprehensive treatment of electrical machines and their applications."
    },
    {
        id: 10,
        title: "Circuit Theory / Network Analysis",
        author: "Van Valkenburg",
        price: 580,
        image: "Images/j.jpg",
        category: "eee",
        rating: 4.7,
        reviews: 167,
        description: "Essential circuit analysis techniques and network theorems."
    },
    {
        id: 11,
        title: "Digital Signal Processing",
        author: "Proakis & Manolakis",
        price: 540,
        image: "Images/k.jpg",
        category: "eee",
        rating: 4.8,
        reviews: 145,
        description: "Modern approach to digital signal processing theory and applications."
    },
    {
        id: 12,
        title: "Fluid Mechanics",
        author: "R.K. Bansal",
        price: 450,
        image: "Images/l.jpg",
        category: "civil",
        rating: 4.6,
        reviews: 189,
        description: "Comprehensive coverage of fluid mechanics principles and applications."
    },
    {
        id: 13,
        title: "Concrete Technology",
        author: "M.S. Shetty",
        price: 450,
        image: "Images/m.jpg",
        category: "civil",
        rating: 4.7,
        reviews: 156,
        description: "Complete guide to concrete materials, properties, and construction techniques."
    },
    {
        id: 14,
        title: "Structural Analysis",
        author: "R.C. Hibbeler",
        price: 500,
        image: "Images/n.jpg",
        category: "civil",
        rating: 4.9,
        reviews: 234,
        description: "Classical and modern methods of structural analysis."
    },
    {
        id: 15,
        title: "Hydraulics & Hydraulic Machines",
        author: "P.N. Modi, S.M. Seth",
        price: 550,
        image: "Images/o.jpg",
        category: "civil",
        rating: 4.5,
        reviews: 123,
        description: "Practical approach to hydraulics and hydraulic machinery."
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentFilter = 'all';

function updateCounts() {
    document.getElementById('cart-count').textContent = cart.length;
    document.getElementById('wishlist-count').textContent = wishlist.length;
}

function renderBooks(filter = 'all') {
    const booksGrid = document.getElementById('books-grid');
    const filteredBooks = filter === 'all' ? booksData : booksData.filter(book => book.category === filter);

    booksGrid.innerHTML = filteredBooks.map(book => `
        <div class="book-card" data-category="${book.category}">
            <div class="book-image-container">
                <img src="${book.image}" alt="${book.title}" class="book-image">
                <div class="book-overlay">
                    <button class="overlay-btn" onclick="viewBookDetails(${book.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="overlay-btn" onclick="toggleWishlist(${book.id})" title="Add to Wishlist">
                        <i class="${isInWishlist(book.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="book-info">
                <div class="book-category">${book.category.toUpperCase()}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating">
                    <span class="stars">${getStars(book.rating)}</span>
                    <span class="rating-count">(${book.reviews})</span>
                </div>
                <div class="book-footer">
                    <span class="book-price">₹${book.price}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${book.id})">
                        <i class="fas fa-shopping-cart"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    const existingItem = cart.find(item => item.id === bookId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    showNotification('Added to cart!');
}

function isInWishlist(bookId) {
    return wishlist.some(item => item.id === bookId);
}

function toggleWishlist(bookId) {
    const book = booksData.find(b => b.id === bookId);
    const index = wishlist.findIndex(item => item.id === bookId);

    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification('Removed from wishlist');
    } else {
        wishlist.push(book);
        showNotification('Added to wishlist!');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounts();
    renderBooks(currentFilter);
}

function viewBookDetails(bookId) {
    const book = booksData.find(b => b.id === bookId);
    const modal = document.getElementById('book-detail-modal');
    const body = document.getElementById('book-detail-body');

    body.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; padding: 30px;">
            <div>
                <img src="${book.image}" alt="${book.title}" style="width: 100%; border-radius: 12px;">
            </div>
            <div>
                <div style="font-size: 12px; color: var(--primary-color); font-weight: 600; text-transform: uppercase; margin-bottom: 10px;">
                    ${book.category.toUpperCase()}
                </div>
                <h2 style="font-size: 32px; margin-bottom: 10px;">${book.title}</h2>
                <p style="color: var(--text-light); font-size: 18px; margin-bottom: 20px;">by ${book.author}</p>

                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <div class="stars" style="color: #fbbf24; font-size: 18px;">${getStars(book.rating)}</div>
                    <span style="color: var(--text-light);">${book.rating} (${book.reviews} reviews)</span>
                </div>

                <div style="font-size: 36px; font-weight: 800; color: var(--primary-color); margin-bottom: 30px;">
                    ₹${book.price}
                </div>

                <p style="color: var(--text-dark); line-height: 1.8; margin-bottom: 30px; font-size: 16px;">
                    ${book.description}
                </p>

                <div style="display: flex; gap: 15px;">
                    <button class="btn-primary" onclick="addToCart(${book.id}); closeModal('book-detail-modal')" style="flex: 1; padding: 16px;">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn-secondary" onclick="toggleWishlist(${book.id}); closeModal('book-detail-modal')" style="padding: 16px 24px;">
                        <i class="${isInWishlist(book.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" onclick="closeModal('cart-modal')">Continue Shopping</button>
            </div>
        `;
        cartTotal.textContent = '₹0';
        return;
    }

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">${item.author}</div>
                <div class="cart-item-footer">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <div class="cart-item-price">₹${item.price * item.quantity}</div>
                    <button class="remove-item-btn" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `₹${total}`;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCounts();
    renderCart();
    showNotification('Item removed from cart');
}

function renderWishlist() {
    const wishlistItems = document.getElementById('wishlist-items');

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-state">
                <i class="far fa-heart"></i>
                <p>Your wishlist is empty</p>
                <button class="btn-primary" onclick="closeModal('wishlist-modal')">Browse Books</button>
            </div>
        `;
        return;
    }

    wishlistItems.innerHTML = wishlist.map((item, index) => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.title}" class="wishlist-item-image">
            <div class="wishlist-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">${item.author}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="wishlist-item-actions">
                    <button class="btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                    <button class="btn-secondary" onclick="removeFromWishlist(${index})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateCounts();
    renderWishlist();
    renderBooks(currentFilter);
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');

    if (modalId === 'cart-modal') {
        renderCart();
    } else if (modalId === 'wishlist-modal') {
        renderWishlist();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--primary-color);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('cart-btn').addEventListener('click', () => openModal('cart-modal'));
document.getElementById('wishlist-btn').addEventListener('click', () => openModal('wishlist-modal'));
document.getElementById('auth-btn').addEventListener('click', () => openModal('auth-modal'));

document.getElementById('close-cart').addEventListener('click', () => closeModal('cart-modal'));
document.getElementById('close-wishlist').addEventListener('click', () => closeModal('wishlist-modal'));
document.getElementById('close-auth').addEventListener('click', () => closeModal('auth-modal'));
document.getElementById('close-book-detail').addEventListener('click', () => closeModal('book-detail-modal'));

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.dataset.filter;
        renderBooks(currentFilter);
    });
});

document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        document.querySelector(`[data-filter="${category}"]`).click();
        scrollToSection('bestsellers');
    });
});

document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
    });
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        const target = link.getAttribute('href');
        scrollToSection(target.substring(1));
    });
});

const scrollToTopBtn = document.getElementById('scroll-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }

    if (window.scrollY > 100) {
        document.getElementById('navbar').classList.add('scrolled');
    } else {
        document.getElementById('navbar').classList.remove('scrolled');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );

    const booksGrid = document.getElementById('books-grid');
    if (searchTerm) {
        booksGrid.innerHTML = filteredBooks.map(book => `
            <div class="book-card" data-category="${book.category}">
                <div class="book-image-container">
                    <img src="${book.image}" alt="${book.title}" class="book-image">
                    <div class="book-overlay">
                        <button class="overlay-btn" onclick="viewBookDetails(${book.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="overlay-btn" onclick="toggleWishlist(${book.id})">
                            <i class="${isInWishlist(book.id) ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="book-info">
                    <div class="book-category">${book.category.toUpperCase()}</div>
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-author">${book.author}</p>
                    <div class="book-rating">
                        <span class="stars">${getStars(book.rating)}</span>
                        <span class="rating-count">(${book.reviews})</span>
                    </div>
                    <div class="book-footer">
                        <span class="book-price">₹${book.price}</span>
                        <button class="add-to-cart-btn" onclick="addToCart(${book.id})">
                            <i class="fas fa-shopping-cart"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    } else {
        renderBooks(currentFilter);
    }
});

document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    showNotification('Checkout feature coming soon!');
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Login successful!');
    closeModal('auth-modal');
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Registration successful!');
    closeModal('auth-modal');
});

document.getElementById('mobile-toggle').addEventListener('click', () => {
    const navMenu = document.getElementById('nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

updateCounts();
renderBooks();