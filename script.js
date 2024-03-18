const myLibrary = [
    {
        title: "The Giver",
        author: "I have no idea",
        pages: 567,
        read: true
    },
    {
        title: "The Dictionary",
        author: "Deez  Nuts",
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

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook)
}

function setLibraryHtml(myLibrary) {
    let myHtml = '';
    let readOrNot;
    for (const book of myLibrary) {
        if (book.read == true) {
            readOrNot = `<span class="read-true">Already read this book</span>`
        } else readOrNot = `<span class="read-false">Need to read this book</span>`
        myHtml += `<div class="card">
        <span class="book-title">${book.title}</span>
        <span class="book-author">by ${book.author}</span>
        <span class="page-number">${book.pages} pages long</span>
        ${readOrNot}
        </div>`
    }
    myHtml += `<div id="add-book" class="card"><span id="add" title="Add a book">+</span></div>`
    document.getElementById('library').setHTML(myHtml);

    createAddBookFunction();
}

setLibraryHtml(myLibrary);

function createAddBookFunction() {
document.getElementById('add').addEventListener('click', function() {
    let addBook = document.getElementById('add-book');
    addBook.setAttribute('id', 'add-book-form');
    addBook.setHTML(`<form id="addBookForm">
        <label>
            Book Title:  <input type="text" name="title">
        </label>
        <label>
            Author Name: <input type="text" name="author">
        </label>
        <label>
            Number of Pages: <input type="number" name="pages">
        </label>
        <label>
            Already Read?: <input type="checkbox" name="read">
        </label>
        <input type="submit" value="Submit">
    </form>`);

    document.getElementById("addBookForm").addEventListener("submit", function (e) {
        e.preventDefault();
        
        let form = document.getElementById("addBookForm");
        let formData = new FormData(form);
        // output as an object
        console.log(Object.fromEntries(formData));
        let formBook = Object.fromEntries(formData)

        addBookToLibrary(formBook.title, formBook.author, formBook.pages, formBook.read);

        let book = new Book(formBook.title, formBook.author, formBook.pages, formBook.read);
        console.log(book);

        setLibraryHtml(myLibrary);
      });
})
}