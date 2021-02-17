const init = () => {
    document.getElementbyId("button-clear").addEventListener("click", reset);
    document.getElementbyId("button-submit").addEventListener("click", submit);

}

const library = document.getElementById("library");


const reset = function reset(ev){
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

let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
}

function addBookToLibrary(title, author, pages, readStatus){
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook)
}

function displayBooks(array){
//START HERE LOOP THORUGH ARRAY CREATING HTML POPULATED 
}

document.addEventListener("DOMContentLoaded", init);

