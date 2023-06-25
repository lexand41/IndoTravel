const headerMenu = document.querySelector('.header__menu');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.prepend(overlay);

document.addEventListener('click', ({target}) => {
  if (target.closest('.header__menu-button')) {
    headerMenu.classList.toggle('header__menu_active');
    overlay.classList.toggle('overlay__activ');
  } else if (target.closest('.header__link')) {
    headerMenu.classList.remove('header__menu_active');
    overlay.classList.remove('overlay__activ');
  } else if (target.closest('.header__menu')) {
    return;
  } else {
    headerMenu.classList.remove('header__menu_active');
    overlay.classList.remove('overlay__activ');
  }
});

const headerLinks = document.querySelectorAll('.header__link');

headerLinks.forEach(headerLink => {
  headerLink.addEventListener('click', (e) => {
    e.preventDefault();

    const blockID = headerLink.getAttribute('href').substring(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});

