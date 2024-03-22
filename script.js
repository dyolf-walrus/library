const myLibrary = [
    {
        title: "The Giver",
        author: "I have no idea",
        pages: 567,
        read: true
    },
    {
        title: "The Dictionary",
        author: "Deez Nuts",
        pages: 12,
        read: false
    }
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    if (read) {
        this.read = true;
    } else {
        this.read = false;
    }
}

function setLibraryHtml(myLibrary) {
    let myHtml = '';
    let readOrNot;
    for (const book of myLibrary) {
        if (book.read == true) {
            readOrNot = `<span class="read-true">Already read this book</span>`
        } else readOrNot = `<span class="read-false">Mark as read <input type="checkbox"></span>`
        myHtml += `<div class="card">
        <span class="book-title">${book.title}</span>
        <span class="book-author">by ${book.author}</span>
        <span class="page-number">${book.pages} pages long</span>
        ${readOrNot}
        </div>`
    }
    myHtml += `<div id="add-book" class="card"><span id="add" title="Add a book">+</span></div>`
    document.getElementById('library').setHTML(myHtml);

    document.getElementById('add').addEventListener('click', function() {showForm()});
}

setLibraryHtml(myLibrary);

function showForm() {
    let addBook = document.getElementById('add-book');
    addBook.setAttribute('id', 'add-book-form');
    addBook.setHTML(`<form id="addBookForm">
        <label>
            <span>Book Title:</span>  <input id="book-title" type="text" name="title">
        </label>
        <label>
            <span>Author Name:</span> <input type="text" name="author">
        </label>
        <label>
            <span>Number of Pages:</span> <input type="number" name="pages">
        </label>
        <label class="keep-left">
            <span>Already Read?:</span> <input class="more-space" type="checkbox" name="read">
        </label>
        <input type="submit" value="Submit">
        <div class="hidden" id="error1">
            Error - that book is already in your library!
        </div>
    </form>`);

    document.getElementById("book-title").addEventListener("click", function() {
        document.getElementById('error1').classList.add('hidden');
    })
    document.getElementById("addBookForm").addEventListener("submit", function (e) {submitBook(e)});
}

function submitBook(e) {
        e.preventDefault();
        
        let form = document.getElementById("addBookForm");
        let formData = new FormData(form);
        // output as an object
        let formBook = Object.fromEntries(formData)

        if (myLibrary.some(books => books.title == formBook.title)) {
            document.getElementById('error1').classList.remove('hidden');
        } else {
            let book = new Book(formBook.title, formBook.author, formBook.pages, formBook.read);
            myLibrary.push(book);

            setLibraryHtml(myLibrary);
        }
}