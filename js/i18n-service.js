'use strict';
var gTrans = {
  title: {
    en: 'Welcome to my book shop!',
    he: 'ברוכים הבאים לחנות הספרים שלי!',
  },
  'add-new-btn': {
    en: 'Add new book',
    he: 'הוסף ספר חדש',
  },
  'add-book-placeholder': {
    en: 'Enter book name',
    he: 'הכנס שם ספר',
  },
  'add-price-placeholder': {
    en: 'Price?',
    he: 'מחיר?',
  },
  'close-modal-btn': {
    en: 'Close',
    he: 'סגור',
  },
  'read-book-btn': {
    en: 'Read',
    he: 'קרא',
  },
  'update-book-btn': {
    en: 'Update',
    he: 'עדכן',
  },
  'delete-book-btn': {
    en: 'Delete',
    he: 'מחק',
  },
  'table-id': {
    en: 'id',
    he: 'זיהוי',
  },
  'table-price': {
    en: 'Price',
    he: 'מחיר',
  },
  'table-actions': {
    en: 'Actions',
    he: 'פעולות',
  },
  'table-title': {
    en: 'Title',
    he: 'שם הספר',
  },
};

var gCurrLang = 'en';

function getTrans(transKey) {
  //   console.log(transKey);
  var keyTrans = gTrans[transKey];
  //   console.log(keyTrans);
  var txt = keyTrans[gCurrLang];
  //   if (!txt) return keyTrans.en;
  return txt;
}

function doTrans() {
  var els = document.querySelectorAll('[data-trans]');
  els.forEach(function (el) {
    var txt = getTrans(el.dataset.trans);
    if (el.nodeName === 'INPUT') el.placeholder = txt;
    else el.innerText = txt;
  });
}

function formatNumOlder(num) {
  return num.toLocaleString('es');
}

function formatNum(num) {
  return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
  if (gCurrLang === 'he') {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
    }).format(num);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(num);
  }
}

function formatDate(time) {
  var options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
  return km / 1.609;
}

function setLang(lang) {
  gCurrLang = lang;
}

function getCurrLang() {
  return gCurrLang;
}
