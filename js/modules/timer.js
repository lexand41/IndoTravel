const getTimeReamaining = (deadline) => {
  const dateStop = new Date(deadline).getTime();
  const dateNow = Date.now();
  const timeRemaining = dateStop - dateNow;

  const seconds = Math.floor(timeRemaining / 1000 % 60);
  const minutes = Math.floor(timeRemaining / 1000 / 60 % 60);
  const hours = Math.floor(timeRemaining / 1000 / 60 / 60 % 24);
  const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

  return {timeRemaining, seconds, minutes, hours, days};
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
  const timerDeadlines = document.querySelectorAll('[data-timer-deadline]');
  timerDeadlines.forEach(timerDeadline => {
    const e = timerDeadline;

    const timerCountDays = e.querySelector('.timer__count_days');
    const timerUnitsDays = e.querySelector('.timer__units_days');

    const timerCountHours = e.querySelector('.timer__count_hours');
    const timerUnitsHours = e.querySelector('.timer__units_hours');

    const timerCountMinutes = e.querySelector('.timer__count_minutes');
    const timerUnitsMinutes = e.querySelector('.timer__units_minutes');


    const start = () => {
      const timer = getTimeReamaining(deadline);
      if (timer.days === 0) {
        timerCountDays.textContent =
          timer.hours < 10 ? '0' + timer.hours : timer.hours;
        incline(timer.hours, timerUnitsDays, 'час', 'часа', 'часов');
        timerCountHours.textContent =
          timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
        incline(timer.minutes, timerUnitsHours, 'минута', 'минуты', 'минут');
        timerCountMinutes.textContent =
          timer.seconds < 10 ? '0' + timer.seconds : timer.seconds;
        incline(timer.seconds, timerUnitsMinutes, 'секунда', 'секунды', 'секунд');
      } else {
        timerCountDays.textContent = timer.days;
        incline(timer.days, timerUnitsDays, 'день', 'дня', 'дней');
        timerCountHours.textContent =
          timer.hours < 10 ? '0' + timer.hours : timer.hours;
        incline(timer.hours, timerUnitsHours, 'час', 'часа', 'часов');
        timerCountMinutes.textContent =
          timer.minutes < 10 ? '0' + timer.minutes : timer.minutes;
        incline(timer.minutes, timerUnitsMinutes, 'минута', 'минуты', 'минут');
      }
      const intervalId = setTimeout(start, 1000);

      if (timer.timeRemaining <= 0) {
        clearTimeout(intervalId);
        const heroText = document.querySelector('.hero__text');
        const heroTimers = document.querySelectorAll('.timer');
        heroTimers.forEach(heroTimer => {
          heroTimer.remove();
        });
        heroText.remove();
      }
    };
    start();
  });
};
