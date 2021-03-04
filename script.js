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
    const readToggle = document.querySelectorAll(".switch");
    readToggle.forEach((toggle) => {
        toggle.addEventListener("change", (e) => {
            e.preventDefault();
            e.stopPropagation();
            let id = toggle.parentElement.dataset.id;
            toggleRead(id);
        })
    })
};

//form reset button
const reset = function reset(ev) {
    ev.preventDefault();
    document.getElementById("form-add").reset();
}

let storage;
//form submit button
const submit = function submit() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("read").checked;
    storage = read;
    console.log(title, author, pages, read);
    addBookToLibrary(title, author, pages, read);
}

//bin button function for each myLibrary array
function bin(id) {
    let index = myLibrary.findIndex(k => k.id === parseInt(id)); //finds book in array based on data-id
    myLibrary.splice(index, 1); 
    render(myLibrary);
    init();
    saveData();
}

// function added to prototype to toggle read status
function toggleRead(id) {
    let index = myLibrary.findIndex(k => k.id === parseInt(id));
    myLibrary[index].readStatus ? myLibrary[index].readStatus = false :
    myLibrary[index].readStatus = true;
    console.log(myLibrary[index].readStatus);
    saveData();
}

let myLibrary = [
    // {
    //     title: "Harry Potter",
    //     author: "JK Rowling",
    //     pages: 500,
    //     readStatus: true,
    //     id: 15604043,
    // }
];


function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages + " pages."
    this.readStatus = readStatus
    this.id = Date.now() //creates id for each book based on time created
}

function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook)
    render(myLibrary);
    init();
    saveData();
}

const library = document.getElementById("library");


//creates book in DOM from object
function createBookTemplate(book) {
    let tileTemp = document.querySelector("#template");
    let tile = tileTemp.cloneNode(true);
    let tileContent = tile.querySelector(".content")
    tile.id = "";
    tile.classList.add("book");
    library.appendChild(tile);
    for (let key in book) {
        if (book[key] === "") continue; //if blank skips to next         
        if (key === "id") {             //give data-id value of array pos
            tile.setAttribute("data-id", book[key]);
            continue;
        }
        if (key === "readStatus") {
            //asigns the toggle to true if book is read
            if (book[key]) tile.querySelector(".switchy").setAttribute("checked", "checked");
            continue;
        }
        let info = document.createElement("p");
        if (key === "title") { 
            info.setAttribute("class", "title");
            info.textContent = `${book[key]}`;
            tileContent.appendChild(info);
            continue; 
        }
        info.setAttribute("class", "info");
        info.textContent = `${book[key]}`;
        tileContent.appendChild(info);
    }
}

//cycles through array
function render(array) {
    while (library.lastChild) library.removeChild(library.lastChild);
    array.forEach(arrayItem => {
        const book = createBookTemplate(arrayItem);
    });
}

//function to save to local storage
function saveData() {
    if (typeof(Storage) !== "undefined") {
        window.localStorage.setItem("library", JSON.stringify(myLibrary))
        } else {
        alert("Local storage is not supported - changes will not be saved!")
    }
    
}

//function to check local storage and pull library at start
function loadData() {
    if (typeof(Storage) !== "undefined") {
        myLibrary = JSON.parse(window.localStorage.getItem("library"));
        } else {
        myLibrary = [];
    }
}

loadData();

render(myLibrary);

document.addEventListener("DOMContentLoaded", init);    //initializes event listeners for form