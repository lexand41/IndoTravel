const createModalBook = () => {
  const resForm = document.querySelector('.reservation__form');
  const modalBook = document.createElement('div');
  modalBook.classList.add('modal__win');
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
      // showBookInfo.textContent = '';
      // resForm.reset();
      resForm.setAttribute('disabled', 'true');
    }
  });

  modalBox.addEventListener('click', e => {
    e._isClickWithInModal = true;
  });

  modalBook.addEventListener('click', e => {
    if (e._isClickWithInModal) return;
    e.currentTarget.classList.remove('open');
    // showBookInfo.textContent = '';
    // resForm.reset();
    resForm.setAttribute('disabled', 'true');
  });

  return {
    modalBox,
    modalBook,
  };
};

export default createModalBook;
