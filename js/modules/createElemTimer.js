export const pluginTimer = () => {
  const timerDeadlines = document.querySelectorAll('[data-timer-deadline]');
  timerDeadlines.forEach(timerDeadline => {
    if (timerDeadline === null) return;

    timerDeadline.classList.add('timer');

    const timerTitle = document.createElement('p');
    timerTitle.className = 'timer__title';

    const timerItemDays = document.createElement('p');
    timerItemDays.className = 'timer__item timer__item_days';
    const timerCountDays = document.createElement('span');
    timerCountDays.className = 'timer__count timer__count_days';
    const timerUnitsDays = document.createElement('span');
    timerUnitsDays.className = 'timer__units timer__units_days';
    timerItemDays.append(timerCountDays, timerUnitsDays);

    const timerItemHours = document.createElement('p');
    timerItemHours.className = 'timer__item timer__item_hours';
    const timerCountHours = document.createElement('span');
    timerCountHours.className = 'timer__count timer__count_hours';
    const timerUnitsHours = document.createElement('span');
    timerUnitsHours.className = 'timer__units timer__units_hours';
    timerItemHours.append(timerCountHours, timerUnitsHours);

    const timerItemMinutes = document.createElement('p');
    timerItemMinutes.className = 'timer__item timer__item_minutes';
    const timerCountMinutes = document.createElement('span');
    timerCountMinutes.className = 'timer__count timer__count_minutes';
    const timerUnitsMinutes = document.createElement('span');
    timerUnitsMinutes.className = 'timer__units timer__units_minutes';
    timerItemMinutes.append(timerCountMinutes, timerUnitsMinutes);

    timerDeadline.append(
      timerTitle, timerItemDays, timerItemHours, timerItemMinutes);
  });
};
