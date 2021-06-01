'use strict';

function onInit() {
  console.log('hi');
  renderBooks();
  doTrans();
}

function renderBooks() {
  var books = getBooks();

  var strHtml = books.map(function (book) {
    return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${formatCurrency(book.price)}</td>
        <td>
            <button type="button" class="btn btn-primary"data-trans="read-book-btn" class='read' onclick="onReadBook('${
              book.id
            }')">Read</button>
            <button type="button" class="btn btn-warning"  data-trans="update-book-btn" class='update' onclick="onUpdateBook('${
              book.id
            }')">Update</button>
            <button type="button" class="btn btn-danger"  data-trans="delete-book-btn" class='delete' onclick="onDeleteBook('${
              book.id
            }')">Delete</button>
        </td>
    </tr>`;
  });
  document.querySelector('.main-table').innerHTML = strHtml.join('');
}

function onSetSort(sortBy) {
  setSort(sortBy);
  renderBooks();
  doTrans();
}

function onAddBook(ev) {
  if (ev) ev.preventDefault();
  console.log('hi');

  var elBookName = document.querySelector('.book-name').value;
  var elBookPrice = document.querySelector('.book-price').value;
  addBook(elBookName, elBookPrice);
  document.querySelector('.book-name').value = '';
  document.querySelector('.book-price').value = '';

  renderBooks();
  doTrans();
}

function onUpdateBook(bookId) {
  if (getCurrLang() === 'en') {
    var newPrice = +prompt('New price please?');
  } else {
    var newPrice = +prompt('מחיר חדש?');
  }
  updateBook(bookId, newPrice);
  renderBooks();
  doTrans();
}

function onDeleteBook(bookId) {
  deleteBook(bookId);
  renderBooks();
  doTrans();
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elImg = document.querySelector('.img-container');
  elImg.innerHTML = `<img class="book-img-top" src="img/${book.img}.png"></img>`;
  var elModal = document.querySelector('.book-modal');
  document.querySelector(
    '.rate-container'
  ).innerHTML = `<button class='plus-btn' onclick="onIncreaseCounter('${book.id}')">+</button><span>'${book.rate}'</span><button class='minus-btn'
  onclick="onDecreaseCounter('${book.id}')">-</button>`;
  elModal.querySelector('h5').innerText = book.name;
  elModal.querySelector('p').innerText = book.desc;
  elModal.hidden = false;
  doTrans();
}
function renderPageNum() {
  document.querySelector('.pages span').innerText = getPage();
}

function onTurnPage(diff) {
  turnPage(diff);
  renderPageNum();
  renderBooks();
}

function onCloseModal() {
  document.querySelector('.book-modal').hidden = true;
}

function onIncreaseCounter(bookId) {
  increaseCounter(bookId);
  onReadBook(bookId);
}

function onDecreaseCounter(bookId) {
  decreaseCounter(bookId);
  onReadBook(bookId);
}

function openBookModal() {
  document.querySelector('.newbook-hide').hidden = false;
}

function onSetLang(lang) {
  setLang(lang);
  renderBooks();
  doTrans();
}
