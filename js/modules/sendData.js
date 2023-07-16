import showModal from './modal.js';
import createModalBook from './createModalBook.js';
// import './modules/masks.js';

// const showBookInfo = document.querySelector('.reservation__info');
const wrapName = document.getElementById('wrap__name');
const resForm = document.querySelector('.reservation__form');
const footerForm = document.querySelector('.footer__form');
const footerFormTitle = document.querySelector('.footer__form-title');
const footerText = document.querySelector('.footer__text');
const footerInputWrap = document.querySelector('.footer__input-wrap');
const {
  modalBox,
  modalBook,
} = createModalBook();

const fetchRequest = async (url, {
  method = 'get',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };
    if (body) options.body = JSON.stringify(body);

    if (headers) options.headers = headers;

    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      if (callback) callback(null, data);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}
      Перегрузите страницу и попробуйте ещё раз.`);
  } catch (err) {
    callback(err);
  }
};

const createRequestBook = () => {
  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      dates: resForm.dates.value,
      people: resForm.people.value,
      fullname: resForm.resfullname.value,
      phone: resForm.resphone.value,
    },
    callback(err, data) {
      if (err) {
        console.log(err, data);
        // resForm.textContent = err;
        modalBox.innerHTML = `
          <h1 style="margin-bottom: 10px">
            Упс... Что-то пошло не так</h1>
          <p style="margin-bottom: 30px">
            Не удалось отправить заявку.
            Пожалуйста, повторите отправку еще раз</p>
          <button style="margin-bottom: 30px"
          class="button reservation__button">Забронировать</button>
        `;
        modalBox.style.padding = '77px 160px';
        // const resBtn = resForm.querySelector('.reservation__button');
        const modalBtn = modalBox.querySelector('button');
        modalBtn.addEventListener('click', (e) => {
          createRequestBook();
        });
      }

      modalBook.classList.add('open');

      const btnResForm = resForm.querySelector('.reservation__button');
      btnResForm.setAttribute('disabled', 'true');

      const resSelects = document.querySelectorAll('.reservation__select');
      resSelects.forEach(elem => {
        elem.setAttribute('disabled', 'true');
      });

      const resInputs = document.querySelectorAll('.reservation__input');
      resInputs.forEach(elem => {
        elem.setAttribute('disabled', 'true');
      });
      // resForm.innerHTML = `
      //   <h2>Заявка успешно отправлена</h2>
      //   <h3>номер заявки ${data.id}<p>
      //   <h2>Наши менеджеры свяжутся с вами</h2>
      // `;
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const createRequestFooter = () => {
  fetchRequest('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: {
      mail: footerForm.footerinput.value,
    },
    callback(err, data) {
      if (err) {
        console.log(err, data);
        footerForm.textContent = err;
      }
      footerFormTitle.textContent = `Ваша заявка успешно отправлена`;
      // eslint-disable-next-line max-len
      footerText.textContent = `Наши менеджеры свяжутся с вами в течении 3-х рабочих дней`;
      footerInputWrap.style.setProperty('opacity', '0', 'important');
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

resForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(41);
  // wrapName.classList.remove('input-wrap__valid');


  const countPersons = sessionStorage.getItem('countPersons');
  const dates = sessionStorage.getItem('dates');
  const fullPrice = sessionStorage.getItem('fullPrice');

  showModal(countPersons, dates, fullPrice);
});

footerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createRequestFooter();
});

export default createRequestBook;
