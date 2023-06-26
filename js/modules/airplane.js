const docElem = document.documentElement;
let scrollTop = window.pageYOffset;
const airplane = document.createElement('div');
airplane.classList.add('.airplane');

const airplaneCss = `
  position: fixed;
  width: 50px;
  height: 50px;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: url('img/airplane.svg') center/contain no-repeat;
`;

document.body.append(airplane);

airplane.style.cssText = docElem.clientWidth < 758 ? '' : airplaneCss;
window.addEventListener('resize', () => {
  airplane.style.cssText = docElem.clientWidth < 758 ? '' : airplaneCss;
});


const calcPositionAirplane = () => {
  const maxScroll = docElem.scrollHeight - docElem.clientHeight;
  const maxTop = docElem.clientHeight - airplane.clientHeight;
  const scrolled = window.pageYOffset / maxScroll * maxTop;

  airplane.style.bottom = (scrolled + 'px');

  if (window.pageYOffset === maxScroll) {
    airplane.style.transform = `rotate(180deg)`;
  }
  if (window.pageYOffset === 0) {
    airplane.style.transform = `none`;
  }
};

window.addEventListener('scroll', () => {
  requestAnimationFrame(calcPositionAirplane);

  if (window.pageYOffset > scrollTop) {
    airplane.style.transform = `none`;
  } else {
    airplane.style.transform = `rotate(180deg)`;
  }
  scrollTop = window.pageYOffset;
});

calcPositionAirplane();

