const getTimeReamaining = (deadline) => {
  const dateStop = new Date(deadline).getTime();
  const dateNow = Date.now();
  const timeRemaining = dateStop - dateNow;

  const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
  const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
  const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

  return {timeRemaining, minutes, hours, days};
};

const incline = (timerDate, dateContent, nominative, genetive, genPlural) => {
  if (!(10 < timerDate && timerDate < 15)) {
    switch (timerDate % 10) {
      case 1:
        dateContent.textContent = nominative;
        break;
      case 2:
      case 3:
      case 4:
        dateContent.textContent = genetive;
        break;
      default:
        dateContent.textContent = genPlural;
    }
  } else {
    dateContent.textContent = genPlural;
  }
};

export const timer = (deadline) => {
  const timerCountDays = document.querySelector('.timer__count_days');
  const timerUnitsDays = document.querySelector('.timer__units_days');

  const timerCountHours = document.querySelector('.timer__count_hours');
  const timerUnitsHours = document.querySelector('.timer__units_hours');

  const timerCountMinutes = document.querySelector('.timer__count_minutes');
  const timerUnitsMinutes = document.querySelector('.timer__units_minutes');

  const heroText = document.querySelector('.hero__text');
  const heroTimer = document.querySelector('.hero__timer');

  const start = () => {
    const timer = getTimeReamaining(deadline);

    timerCountDays.textContent = timer.days;
    incline(timer.days, timerUnitsDays, 'день', 'дня', 'дней');

    timerCountHours.textContent =
      timer.hours < 10 ? '0' + timer.hours : timer.hours;
    incline(timer.hours, timerUnitsHours, 'час', 'часа', 'часов');

    timerCountMinutes.textContent =
      timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
    incline(timer.minutes, timerUnitsMinutes, 'минута', 'минуты', 'минут');

    const intervalId = setTimeout(start, 1000);

    if (timer.timeRemaining <= 0) {
      clearTimeout(intervalId);
      heroText.remove();
      heroTimer.remove();
      timerCountDays.textContent = '0';
      timerCountHours.textContent = '00';
      timerCountMinutes.textContent = '00';
    }
  };
  start();
};
