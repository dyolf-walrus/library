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
    this.read = read;
}

function addBookToLibrary() {
    let title = "Stinky Stinky" //document.something.value;
    let author = "Lulu" //document.something.value;
    let pages = 436 //parseInt(document.something.value);
    let read = true //document.something.value;

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
    document.getElementById('library').setHTML(myHtml);
    console.log(myHtml)
}

setLibraryHtml(myLibrary);