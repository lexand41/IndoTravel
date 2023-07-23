import './modules/burger.js';
import './modules/acc.js';
import './modules/airplane.js';
import './modules/data.js';
import './modules/sendData.js';
import './modules/validateMask.js';
import './modules/slider.js';
// import './modules/masks.js';

import {timer} from './modules/timer.js';
import {pluginTimer} from './modules/createElemTimer.js';

const dataDeadline = document.querySelector('.timer');
dataDeadline.dataset.timerDeadline = '2023/07/19 12:48 GMT+0300';
const deadline = dataDeadline.dataset.timerDeadline;

const resForm = document.querySelector('.reservation__form');
resForm.reset();

pluginTimer();

timer(deadline);
