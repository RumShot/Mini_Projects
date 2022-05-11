class Book {
  constructor(title,author,isbn){
    this.author = author;
    this.title = title;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    //Inserts cols
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);

  }
  showAlert(message, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //insert alert
    container.insertBefore(div, form);
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);

  }
  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }

  }
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

  }
}
//LOCAL sorage
class Store{
  static getBooks(){
    let books;
    if(localStorage.getItem('books')=== null){
      books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  static displayBooks(){
    const books = Store.getBooks();

    books.forEach(function(book){
      const ui = new UI;

      ui.addBookToList(book);
    });
  }
  static addBook(book){
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(){
    const books = Store.getBooks();
    books.forEach(function(book,index){
      if(book.isbn = isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books));
  }
}
//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
//Event listeners
document.getElementById('book-form').addEventListener('submit',function(e){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  const book = new Book (title, author, isbn);

  const ui = new UI();

 if(title === '' || author === '' || isbn === ''){
   //Error allert
   ui.showAlert('Please fill all the fields', 'error');
 }else{
   ui.addBookToList(book);
   //add to LS
   Store.addBook(book);
   //UI show allert
   ui.showAlert('Book Added!', 'success');
   ui.clearFields();
 }
  e.preventDefault();
});
//Event listener 4 delete
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  //remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book Removed!', 'success');
  e.preventDefault();
});
