const books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", image: "https://m.media-amazon.com/images/I/81gepf1eMqL.AC_UF1000,1000_QL80.jpg", isbn: "9780061120084" },
    { title: "1984", author: "George Orwell", image: "https://m.media-amazon.com/images/I/71kXYs4tCvL.AC_UF1000,1000_QL80.jpg", isbn: "9780451524935" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "https://m.media-amazon.com/images/I/91GjOmU7z1L.AC_UF1000,1000_QL80.jpg", isbn: "9780743273565" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/640px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg", isbn: "9780316769488" },
    { title: "Pride and Prejudice", author: "Jane Austen", image: "https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@.V1.jpg", isbn: "9781503290563" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/The_Hobbit_trilogy_dvd_cover.jpg/220px-The_Hobbit_trilogy_dvd_cover.jpg", isbn: "9780547928227" },
    { title: "Moby-Dick", author: "Herman Melville", image: "https://m.media-amazon.com/images/I/41RVtE3JJIL.jpg", isbn: "9781503280786" },
    { title: "War and Peace", author: "Leo Tolstoy", image: "https://m.media-amazon.com/images/I/71wXZB-VtBL.AC_UF1000,1000_QL80.jpg", isbn: "9781853260629" },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", image: "https://m.media-amazon.com/images/I/71O2XIytdqL.AC_UF1000,1000_QL80.jpg", isbn: "9780486415871" },
    { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", image: "https://m.media-amazon.com/images/I/71OZJsgZzQL.AC_UF1000,1000_QL80.jpg", isbn: "9780374528379" }
];

function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'card';
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <div class="card-content">
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <button onclick="addToBucket('${book.title}')">Add to Bucket</button>
            </div>
        `;
        bookList.appendChild(bookCard);
    });
}

function addToBucket(title) {
    alert(`${title} has been added to your bucket!`);
}

document.getElementById('searchBar').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
    displayBooks(filteredBooks);
});

// Display all books initially
displayBooks(books);
