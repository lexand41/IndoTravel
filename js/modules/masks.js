const maskPhone = event => {
  const {target, keyCode, type} = event;

  const pos = target.selectionStart;
  if (pos < 3) event.preventDefault();
  const matrix = '+7 (___) ___-__-__';
  let i = 0;
  const def = matrix.replace(/\D/g, '');
  const val = target.value.replace(/\D/g, '');
  let newValue = matrix.replace(/[_\d]/g,
    a => (i < val.length ? val[i++] || def[i] : a));
  i = newValue.indexOf('_');
  if (i !== -1) {
    i < 5 && (i = 3);
    newValue = newValue.slice(0, i);
  }
  let reg = matrix.substring(0, target.value.length).replace(/_+/g,
    (a) => `\\d{1,${a.length}}`).replace(/[+()]/g, '\\$&');
  reg = new RegExp(`^${reg}$`);
  if (!reg.test(target.value) || target.value.length < 5 ||
    keyCode > 47 && keyCode < 58) {
    target.value = newValue;
    console.log(target.value);
  }
  if (type === 'blur' && target.value.length < 5) target.value = '';
};

const inputPhone = document.getElementById('reservation__phone');
if (inputPhone.type === 'tel') {
  inputPhone.addEventListener('input', maskPhone);
  inputPhone.addEventListener('focus', maskPhone);
  inputPhone.addEventListener('blur', maskPhone);
  inputPhone.addEventListener('keydown', maskPhone);
}

const resBtn = document.querySelector('.reservation__button')
inputPhone.addEventListener('input', () => {
  const regexPhone = /^(\+\d)\s(\(\d{3}\))\s(\d{3}-)(\d{2}-)(\d{2})$/;
  if (regexPhone.test(inputPhone.value)) {
    resBtn.disabled = false;
  } else {
    resBtn.setAttribute('disabled', 'true');
  }
});

const inputName = document.getElementById('reservation__name');
inputName.addEventListener('input', () => {
  inputName.style.textTransform = 'capitalize';
  inputName.value = inputName.value.replace(/[^А-Я\s]/i, '');

  const regexFullName = /^([А-яЁё]+\s)([А-яЁё]+\s)([А-яЁё]+)+/i;
  if (regexFullName.test(inputName.value)) {
    resBtn.disabled = false;
  } else {
    resBtn.setAttribute('disabled', 'true');
  }
});


