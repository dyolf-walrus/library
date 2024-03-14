const myLibrary = [];

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