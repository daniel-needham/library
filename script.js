const init = () => {
    document.getElementById("button-clear").addEventListener("click", reset);
    document.getElementById("button-submit").addEventListener("click", submit);
    const binButtons = document.querySelectorAll(".bin");
    binButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let id = button.parentElement.dataset.id;
            bin(id);
        })
    })
};

const library = document.getElementById("library");

//form reset button
const reset = function reset(ev) {
    ev.preventDefault();
    document.getElementById("form-add").reset();
}

//form submit button
const submit = function submit() {
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");
    addBookToLibrary(title, author, pages, read);
    console.log("ok");

}

//bin button function for each myLibrary array
function bin(id) {
    let index = myLibrary.findIndex(k => k.id === parseInt(id)); //finds book in array based on data-id
    myLibrary.splice(index, 1); 
    render(myLibrary);
}


let myLibrary = [
    {
        title: "Harry Potter",
        author: "JK Rowling",
        pages: 500,
        readStatus: true,
        id: 15604043,
    }
];


function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
    this.id = Date.now() //creates id for each book based on time created

}

function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook)
    render(myLibrary);
}

//creates book in DOM from object
function createBookTemplate(book) {
    let tileTemp = document.querySelector("#template");
    let tile = tileTemp.cloneNode(true);
    tile.id = "";
    tile.classList.add("book");
    library.appendChild(tile);
    for (let key in book) {
        if (book[key] === "") continue;                 //if blank skips to next
        if (key === "id") {                          //give data-id value of array pos
            tile.setAttribute("data-id", book[key]);
            continue;
        }
        let info = document.createElement("p");
        info.setAttribute("class", "info");
        if (key === "pages") {
            info.textContent = `${book[key]} pages`;
            tile.appendChild(info);
            continue;
        }
        info.textContent = `${book[key]}`;
        tile.appendChild(info);
    }
}

//cycles through array
function render(array) {
    while (library.lastChild) library.removeChild(library.lastChild);
    array.forEach(arrayItem => {
        const book = createBookTemplate(arrayItem);
    });
    init();
}



document.addEventListener("DOMContentLoaded", init);    //initializes event listeners for form

render(myLibrary);