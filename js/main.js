import {timer} from './modules/timer.js';


const dataDeadline = document.querySelector('.timer');
dataDeadline.dataset.timerDeadline = '2023/07/19 23:59 GMT+0300';
const deadline = dataDeadline.dataset.timerDeadline;

timer(deadline);
