// Book construktor
function Book(title, author, isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}
// UI construktor
function UI(){}
//Add book to list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  //Inserts cols
  row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);
}
//show allert
UI.prototype.showAlert = function(message, className){
  //Create div
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
//delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}
UI.prototype.clearFields = function (){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}
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
  ui.showAlert('Book Removed!', 'success')
  e.preventDefault();
});






































//end
