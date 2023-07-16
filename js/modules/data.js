const listBookingDate = document.getElementById('reservation__date');
const listBookingPersons = document.getElementById('reservation__people');

const loadBooking = async () => {
  const result = await fetch('./date.json');
  const data = await result.json();
  return data;
};

const inclinePerson = (countPersons, genetive, genPlural) => {
  let content;
  if (!(10 < countPersons && countPersons < 15)) {
    switch (countPersons % 10) {
      case 2:
      case 3:
      case 4:
        content = genetive;
        break;
      default:
        content = genPlural;
    }
  } else {
    content = genPlural;
  }
  return content;
};

const monthToString = (date) => {
  date = date.split('.').reverse();
  return new Date(date).toLocaleString('ru', {
    month: 'long',
    day: 'numeric',
  });
};

const renderBooking = async () => {
  const data = await loadBooking();
  const listBookDate = document.createElement('select');
  listBookDate.classList.add('reservation__select', 'input-wrap_hover');
  listBookDate.setAttribute('id', 'reservation__date');
  listBookDate.setAttribute('name', 'dates');

  const titleData = document.createElement('option');
  titleData.classList.add('tour__option');
  titleData.textContent = 'Дата путешествия';
  listBookDate.append(titleData);

  const bookPersons = document.createElement('select');
  bookPersons.classList.add('reservation__select', 'input-wrap_hover');
  bookPersons.setAttribute('id', 'reservation__people');
  bookPersons.setAttribute('name', 'people');

  const numOfPersons = document.createElement('option');
  numOfPersons.classList.add('tour__option');
  numOfPersons.textContent = 'Kоличество человек';
  bookPersons.append(numOfPersons);

  const booking = data.map(item => {
    const bookingData = document.createElement('option');
    bookingData.className = 'tour__option reservation__option';
    bookingData.value = item.date;
    bookingData.textContent = item.date;

    return bookingData;
  });
  listBookDate.append(...booking);
  listBookingDate.replaceWith(listBookDate);

  const showBookData = document.querySelector('.reservation__data');
  showBookData.textContent = '';
  const showBookPrice = document.querySelector('.reservation__price');
  showBookPrice.textContent = '';

  listBookDate.addEventListener('change', () => {
    const numOfPersons = bookPersons.querySelectorAll('.reservation__option');
    if (numOfPersons) {
      numOfPersons.forEach(el => {
        el.parentNode.removeChild(el);
      });
    }
    const selectDate = document.getElementById('reservation__date');
    data.forEach((el) => {
      if (el.date === selectDate.value) {
        bookPersons.addEventListener('change', () => {
          const persons =
            inclinePerson(bookPersons.value, 'человека', 'человек');
          const str1 = monthToString(el.date.substring(0, 5));
          const str2 = monthToString(el.date.substring(8));
          const fullPrice = (el.price * bookPersons.value).toLocaleString();

          showBookData.textContent =
            `${str1} - ${str2}, ${bookPersons.value} ${persons}`;
          showBookPrice.textContent =
            `${fullPrice}₽`;
          // eslint-disable-next-line max-len
          sessionStorage.setItem('countPersons', `${bookPersons.value} ${persons}`);
          sessionStorage.setItem('fullPrice', fullPrice);
          sessionStorage.setItem('dates', `${str1} - ${str2}`);
        });
        const a = el['min-people'];
        const b = el['max-people'];
        for (let i = a; i < b + 1; i += 1) {
          const resPeople = document.createElement('option');
          resPeople.className = 'tour__option reservation__option';
          resPeople.textContent = i;
          bookPersons.append(resPeople);
          listBookingPersons.replaceWith(bookPersons);
        }
      }
    });
  });
};
renderBooking();
