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

const resForm = document.querySelector('.reservation__form');
resForm.addEventListener('submit', (e) => {
  e.preventDefault();

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
        resForm.textContent = err;
      }
      resForm.innerHTML = `
        <h2>Заявка успешно отправлена</h2>
        <h3>номер заявки ${data.id}<p>
        <h2>Наши менеджеры свяжутся с вами</h2>
      `;
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

const footerForm = document.querySelector('.footer__form');
const footerFormTitle = document.querySelector('.footer__form-title');
const footerText = document.querySelector('.footer__text');
const footerInputWrap = document.querySelector('.footer__input-wrap');
footerForm.addEventListener('submit', (e) => {
  e.preventDefault();

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
});


