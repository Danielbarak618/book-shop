'use strict';
const KEY = 'books';
var gBooks;
var gSortBy = 'Title';
var gSortByDiff = 1;
const PAGE_SIZE = 5;
var gCurrPage = 0;

_createBooks();

function getBooks() {
  var fromIdx = gCurrPage * PAGE_SIZE;
  var toIdx = fromIdx + PAGE_SIZE;
  sortBooks();
  return gBooks.slice(fromIdx, toIdx);
}

function _createBook(name, price, img = 'default', rate = 0) {
  return {
    id: makeId(),
    name: name,
    price: price,
    desc: makeLorem(),
    img: img,
    rate: rate,
  };
}

function sortBooks() {
  gSortByDiff *= -1;
  console.log(gSortByDiff);
  if (gSortBy === 'title') {
    gBooks.sort(function (bookA, bookB) {
      if (bookA.name.toLowerCase() < bookB.name.toLowerCase())
        return -1 * gSortByDiff;
      else if (bookA.name.toLowerCase() > bookB.name.toLowerCase())
        return 1 * gSortByDiff;
    });
  } else if (gSortBy === 'price') {
    gBooks.sort(function (bookA, bookB) {
      return bookB.price - bookA.price;
    });
  }
}

function setSort(sortBy) {
  gSortBy = sortBy;
}

function addBook(name, price) {
  var book = _createBook(name, price);
  gBooks.push(book);
  _saveBooksToStorage();
}

function deleteBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id;
  });
  if (bookIdx === -1) return; // Make sure we delete the right book.
  gBooks.splice(bookIdx, 1);
  _saveBooksToStorage();
}

// function turnPage(diff) {
//   if ((gCurrPage + diff) * PAGE_SIZE >= gBooks.length || gCurrPage + diff < 0)
//     return;
//   gCurrPage += diff;
// }

function turnPage(diff) {
  if ((gCurrPage + diff) * PAGE_SIZE >= gBooks.length || gCurrPage + diff < 0)
    return;
  gCurrPage += diff;
}

function getPage() {
  return gCurrPage + 1;
}

function updateBook(bookId, newBookPrice) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });
  gBooks[bookIdx].price = newBookPrice;
  _saveBooksToStorage();
}

function _createBooks() {
  var books = loadFromStorage(KEY);
  if (!books || !books.length) {
    books = [
      _createBook('Harry potter', 100, 'harrypotter1'),
      _createBook('Lord Of rings', 50),
      _createBook('How to be rich', 200),
    ];
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return bookId === book.id;
  });
  return book;
}

function increaseCounter(bookId) {
  var book = getBookById(bookId);
  if (book.rate >= 10) {
    return;
  }
  book.rate++;
  _saveBooksToStorage();
}

function decreaseCounter(bookId) {
  var book = getBookById(bookId);
  if (book.rate > 0) book.rate--;
  _saveBooksToStorage();
  return;
}
