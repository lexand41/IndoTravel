const showBookInfo = document.querySelector('.reservation__info');
const resForm = document.querySelector('.reservation__form');
const footerForm = document.querySelector('.footer__form');
const footerFormTitle = document.querySelector('.footer__form-title');
const footerText = document.querySelector('.footer__text');
const footerInputWrap = document.querySelector('.footer__input-wrap');

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

const createModalBook = (text, elem) => {
  const modalBook = document.createElement('div');
  modalBook.classList.add('modal');
  modalBook.setAttribute('id', 'my-modal');

  const modalBox = document.createElement('div');
  modalBox.classList.add('modal__box', 'reservation__form');
  modalBox.innerHTML = `
    <h1 style="margin-bottom: 10px">
      Ваша заявка успешно отправлена</h1>
    <p style="margin-bottom: 30px">
      Наши менеджеры свяжутся с вами в течении 3-х рабочих дней</p>
    <img style="margin-bottom: 10px" src="img/ok.svg">
  `;
  modalBook.append(modalBox);
  document.body.append(modalBook);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalBook.classList.remove('open');
      showBookInfo.textContent = '';
      resForm.reset();
    }
  });

  modalBox.addEventListener('click', e => {
    e._isClickWithInModal = true;
  });

  modalBook.addEventListener('click', e => {
    if (e._isClickWithInModal) return;
    e.currentTarget.classList.remove('open');
    showBookInfo.textContent = '';
    resForm.reset();
  });

  return {
    modalBox,
    modalBook,
  };
};

const {
  modalBox,
  modalBook,
} = createModalBook();

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

        const resBtn = resForm.querySelector('.reservation__button');
        const modalBtn = modalBox.querySelector('button');
        modalBtn.addEventListener('click', (e) => {
          resBtn.click();
        });
        console.log(modalBtn);
      }

      modalBook.classList.add('open');
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
  createRequestBook();
});

footerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createRequestFooter();
});
