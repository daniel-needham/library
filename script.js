const init = () => {
    document.getElementbyId("button-clear").addEventListener("click", reset);
    document.getElementbyId("button-submit").addEventListener("click", submit);

}

const library = document.getElementById("library");


const reset = function reset(ev) {
    ev.preventDefault();
    document.getElementById("form-add").reset();
}

const submit = function submit() {
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");
    addBookToLibrary(title, author, pages, read);

}

let myLibrary = [
    {
        title: "Harry Potter",
        author: "JK Rowling",
        pages: 500,
        readStatus: true
    },
    {
        title: "The Lord of the Rings",
        author: "JRR Tolkien",
        pages: 500,
        readStatus: false,
    },
    {
        title: "The Lord of the Rings",
        author: "JRR Tolkien",
        pages: 500,
        readStatus: false,
    },
    {
        title: "The Lord of the Rings",
        author: "JRR Tolkien",
        pages: 500,
        readStatus: false,
    },
    {
        title: "The Lord of the Rings",
        author: "",
        pages: 500,
        readStatus: false,
    }
];


function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
}

function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook)
}

//cycles through array
function render(array) {
    array.forEach(arrayItem => {
        const book = createBookTemplate(arrayItem);
    });
}

//creates book in DOM from object
function createBookTemplate(book) {
    let tile = document.createElement("div");
    tile.setAttribute("class", "book");
    library.appendChild(tile);
    for (let key in book) {
        if (book[key] === "") continue;
        let info = document.createElement("p");
        info.setAttribute("class", "info");
        if (key === "pages") {
            info.textContent = book[key] +" pages."
        } else info.textContent = `${book[key]}`;
        tile.appendChild(info);
    }
}

render(myLibrary);

document.addEventListener("DOMContentLoaded", init);

