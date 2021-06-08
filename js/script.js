const books = document.querySelectorAll('.book');
console.log('books: ', books);
const collection = document.querySelectorAll('.books');

collection[0].prepend(books[1]);
collection[0].append(books[4]);
collection[0].append(books[3]);
collection[0].append(books[5]);
collection[0].append(books[2]);

const bgc = document.querySelector('body');

bgc.style.backgroundImage = 'url("../image/open_book.jpg")';

books[4].childNodes[1].childNodes[1].textContent = 'Книга 3. This и Прототипы Объектов';

const adv = document.querySelector('.adv');

adv.remove();

const book2 = books[0].querySelectorAll('li');

book2[3].after(book2[6]);
book2[6].after(book2[8]);

const book5 = books[5].querySelectorAll('li');

book5[2].before(book5[9]);
book5[9].after(book5[3]);
book5[3].after(book5[4]);

const book6 = books[2].childNodes[3];
const newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';

book6.append(newElem);

const book6LiList = book6.querySelectorAll('li');

book6LiList[8].after(book6LiList[10]);










   // ''