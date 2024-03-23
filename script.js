const myLibrary = [
    {
        title: "The Merriam-Webster Dictionary",
        author: "Merriam Webster",
        pages: 960,
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
        } else readOrNot = `<span class="read-false">Mark as read <input class="markRead" id="${book.title}"type="checkbox"></span>`
        myHtml += `<div class="card">
        <span class="book-title">${book.title}</span>
        <span class="book-author">by ${book.author}</span>
        <span class="page-number">${book.pages} pages long</span>
        ${readOrNot}
        <div id="${book.title}" class="delete"><img data-title="${book.title}" src="images/road-sign-147409.svg"></div>
        <dialog id="confirmDelete${book.title}"><div class=styleDialog>
            <p>Are you sure you want to delete ${book.title}?</p>
            <button id="confirmBtn${book.title}" class="confirm" value="default">Confirm</button>
            <button id="cancelBtn${book.title}" value="cancel" class="cancel" formmethod="dialog">Cancel</button></div>
        </dialog>
        </div>`
    }
    myHtml += `<div id="add-book" class="card"><span id="add" title="Add a book">+</span></div>`

    let lib = document.getElementById('library');
    console.log(lib);
    //lib.setHTML(myHtml);
    lib.innerHTML = myHtml;

    document.getElementById('add').addEventListener('click', function() {showForm()});

    confirmDeletion();

    let checkboxes = document.getElementsByClassName('markRead');
    for (const box of checkboxes) {
        box.addEventListener('click', function(event) {
            let index = myLibrary.findIndex((book) => book.title == event.target.id)
            myLibrary[index].read = true;
            setLibraryHtml(myLibrary);
        })
    }
}

setLibraryHtml(myLibrary);

function showForm() {
    let addBook = document.getElementById('add-book');
    addBook.setAttribute('id', 'add-book-form');
    addBook.setHTML(`<form id="addBookForm">
        <label>
            <span>Book Title:</span>  <input id="book-title" type="text" name="title" required>
        </label>
        <label>
            <span>Author Name:</span> <input type="text" name="author" required>
        </label>
        <label>
            <span>Number of Pages:</span> <input type="number" name="pages" required>
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

        if (myLibrary.some(books => books.title.toLowerCase() == formBook.title.toLowerCase())) {
            document.getElementById('error1').classList.remove('hidden');
        } else {
            let book = new Book(formBook.title, formBook.author, formBook.pages, formBook.read);
            myLibrary.push(book);

            setLibraryHtml(myLibrary);
        }
}

function confirmDeletion() {
    let deleteButtons = document.getElementsByClassName('delete');
    for (const button of deleteButtons) {
        button.addEventListener('click', function() {
            console.log(button.id)
            let dialog = document.getElementById(`confirmDelete${button.id}`);
            dialog.showModal();
        })
        //confirm button
        document.getElementById(`confirmBtn${button.id}`).addEventListener('click', function(event) {
            let dialog = document.getElementById(`confirmDelete${button.id}`);
            dialog.close();
            let index = myLibrary.findIndex((book) => book.title == button.id);
            myLibrary.splice(index, 1);
            console.log(myLibrary);
            setLibraryHtml(myLibrary);
        })
        //cancel button
        document.getElementById(`cancelBtn${button.id}`).addEventListener('click', function(event) {
            let dialog = document.getElementById(`confirmDelete${button.id}`);
            dialog.close();
        })
    }
}