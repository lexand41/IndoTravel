const travelItems = document.querySelectorAll('.travel__item');
const travelItemBtns = document.querySelectorAll('.travel__item-title');
// eslint-disable-next-line max-len
const itemTextWrappers = document.querySelectorAll('.travel__item-text-wrapper');
let heightTextWrapper = 0;

itemTextWrappers.forEach(elem => {
  if (heightTextWrapper < elem.scrollHeight) {
    heightTextWrapper = elem.scrollHeight;
  }
});

travelItemBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    travelItems.forEach((travelItem, i) => {
      if (index === i) {
        itemTextWrappers[i].style.height =
          travelItem.classList.contains('travel__item_active') ?
          '' : `${heightTextWrapper}px`;
        travelItem.classList.toggle('travel__item_active');
      } else {
        travelItem.classList.remove('travel__item_active');
        itemTextWrappers[i].style.height = '';
      }
    });
  });
});
