const headerMenu = document.querySelector('.header__menu');

document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.header__menu-button')) {
    headerMenu.classList.toggle('header__menu_active');
  } else if (target.closest('.header__link')) {
    headerMenu.classList.remove('header__menu_active');
  } else if (target.closest('.header__menu')) {
    return;
  } else {
    headerMenu.classList.remove('header__menu_active');
  }
});


