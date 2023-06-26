import './modules/burger.js';
import './modules/acc.js';
import './modules/airplane.js';
import './modules/data.js';
import {timer} from './modules/timer.js';
import {pluginTimer} from './modules/createElemTimer.js';

const dataDeadline = document.querySelector('.timer');
dataDeadline.dataset.timerDeadline = '2023/07/19 12:48 GMT+0300';
const deadline = dataDeadline.dataset.timerDeadline;

pluginTimer();

timer(deadline);


// const result = await fetch('./date.json');
// const data = await result.json();
// console.log(data);
