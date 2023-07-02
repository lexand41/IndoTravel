import loadStyle from './loadStyle.js';
import createRequestBook from './sendData.js';

const showModal = async (countPersons, dates, fullPrice) => {
  await loadStyle('css/modal.css');

  const overlayModal = document.createElement('div');
  const modalWindow = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const textBooking = document.createElement('p');
  const datesBooking = document.createElement('p');
  const priceBooking = document.createElement('p');
  const modalButtons = document.createElement('div');
  const btnConfirm = document.createElement('button');
  const btnEdit = document.createElement('button');

  overlayModal.classList.add('overlay_confirm');
  modalWindow.classList.add('modal');
  modalTitle.classList.add('modal__title');
  modalTitle.textContent = 'Подтверждение заявки';
  textBooking.classList.add('modal__text');
  // eslint-disable-next-line max-len
  textBooking.textContent = `Бронирование путешествия в Индонезию на ${countPersons}`;
  datesBooking.classList.add('modal__text');
  datesBooking.textContent = `В даты: ${dates}`;
  priceBooking.classList.add('modal__text');
  priceBooking.textContent = `Стоимость тура ${fullPrice}₽`;
  modalButtons.classList.add('modal__button');
  btnConfirm.classList.add('modal__btn', 'modal__btn_confirm');
  btnConfirm.textContent = 'Подтверждаю';
  btnEdit.classList.add('modal__btn');
  btnEdit.textContent = 'Изменить данные';

  overlayModal.append(modalWindow);
  modalWindow.append(
    modalTitle, textBooking, datesBooking, priceBooking, modalButtons);
  modalButtons.append(btnConfirm, btnEdit);

  document.body.append(overlayModal);
  btnConfirm.addEventListener('click', () => {
    createRequestBook();
  });

  return new Promise(resolve => {
    btnConfirm.addEventListener('click', () => {
      overlayModal.remove();
      resolve(false);
    });

    btnEdit.addEventListener('click', () => {
      overlayModal.remove();
      resolve(true);
    });
  });
};

export default showModal;
