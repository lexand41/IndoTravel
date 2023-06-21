const headerMenu = document.querySelector('.header__menu');
const headerMenuButton = document.querySelector('.header__menu-button');

headerMenuButton.addEventListener('click', () => {
  headerMenu.classList.toggle('header__menu_active');
});
