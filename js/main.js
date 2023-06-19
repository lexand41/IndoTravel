import {timer} from './modules/timer.js';
import {pluginTimer} from './modules/createElemTimer.js';

const dataDeadline = document.querySelector('.timer');
dataDeadline.dataset.timerDeadline = '2023/07/19 12:48 GMT+0300';
const deadline = dataDeadline.dataset.timerDeadline;

pluginTimer();

timer(deadline);
