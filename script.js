document.addEventListener('DOMContentLoaded', function() {
    const addBookForm = document.getElementById('addBookForm');
    const bookList = document.getElementById('bookList');
    const logList = document.getElementById('logList');

    // Function to get books from local storage
    function getBooksFromLocalStorage() {
        return JSON.parse(localStorage.getItem('books')) || [];
    }

    // Function to save books to local storage
    function saveBooksToLocalStorage(books) {
        localStorage.setItem('books', JSON.stringify(books));
    }

    // Function to get logs from local storage
    function getLogsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('logs')) || [];
    }

    // Function to save logs to local storage
    function saveLogsToLocalStorage(logs) {
        localStorage.setItem('logs', JSON.stringify(logs));
    }

    // Load books and logs from local storage
    let books = getBooksFromLocalStorage();
    let logs = getLogsFromLocalStorage();

    // Function to render books in the table
    function renderBooks() {
        bookList.innerHTML = '';
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td>${book.description}</td>
                <td><img src="${book.image}" alt="${book.title}"></td>
                <td>${book.quantity}</td>
                <td><button onclick="deleteBook(${book.id})">Delete</button></td>
            `;
            bookList.appendChild(row);
        });
    }

    // Function to render logs in the table
    function renderLogs() {
        logList.innerHTML = '';
        logs.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.action}</td>
                <td>${log.title}</td>
                <td>${log.author}</td>
                <td>${log.isbn}</td>
                <td>${log.quantity}</td>
            `;
            logList.appendChild(row);
        });
    }

    // Function to handle form submission (add new book)
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const bookTitle = document.getElementById('bookTitle').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;
        const description = document.getElementById('description').value;
        const image = document.getElementById('image').value;
        const quantity = parseInt(document.getElementById('quantity').value);

        if (bookTitle && author && isbn && description && image && !isNaN(quantity)) {
            // Check if the book already exists
            const existingBook = books.find(book => book.title === bookTitle);

            if (existingBook) {
                // If the book exists, increase its quantity and update other details
                existingBook.quantity += quantity;
                existingBook.author = author;
                existingBook.isbn = isbn;
                existingBook.description = description;
                existingBook.image = image;
                logs.push({ action: 'Increased Quantity', title: bookTitle, author: author, isbn: isbn, quantity: quantity });
            } else {
                // If the book does not exist, add a new book
                const newBook = {
                    id: books.length + 1,
                    title: bookTitle,
                    author: author,
                    isbn: isbn,
                    description: description,
                    image: image,
                    quantity: quantity
                };
                books.push(newBook);
                logs.push({ action: 'Added', title: bookTitle, author: author, isbn: isbn, quantity: quantity });
            }

            saveBooksToLocalStorage(books);
            saveLogsToLocalStorage(logs);
            renderBooks();
            renderLogs();
            addBookForm.reset();
        } else {
            alert('Please enter valid book details.');
        }
    });

    // Function to delete a book
    window.deleteBook = function(id) {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex !== -1) {
            const deletedBook = books[bookIndex];
            books.splice(bookIndex, 1);
            logs.push({ action: 'Deleted', title: deletedBook.title, author: deletedBook.author, isbn: deletedBook.isbn, quantity: deletedBook.quantity });
            saveBooksToLocalStorage(books);
            saveLogsToLocalStorage(logs);
            renderBooks();
            renderLogs();
        }
    };

    renderBooks();
    renderLogs();
});
