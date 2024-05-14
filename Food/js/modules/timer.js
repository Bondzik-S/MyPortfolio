function timer(id, deadline ) { 

    // Функція для обчислення залишкового часу до кінцевої дати
    function getTimeRemaining(endtime) {

        // Обчислюємо різницю між кінцевою датою та поточною датою в мілісекундах
        const t = Date.parse(endtime) - Date.parse(new Date()),
        
              // Створення змінних для днів, годин, хвилин, секунд
              days = Math.floor((t / (1000 * 60 * 60 * 24))),
              seconds = Math.floor((t / 1000) % 60),
              minutes = Math.floor((t / 1000 / 60) % 60),
              hours = Math.floor((t / (100 * 60 * 60) % 24));

        // Повертаємо обʼєкт зі значеннями залишку часу
        // Оскільки при додаванні в ретурн значень через {} - повертається обʼєкт
        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds,
        };
    }

    function getZero(num) {
        if(num >= 0 && num < 10){
            return '0' + num;
        } else {
            return num;
        }
    }

    // Функція для встановлення значень на сторінку: selector - таймер, який передається при виклику ф-ції (за класом), endtime - deadline
    function setClock(selector, endtime) {
        // Знаходимо таймер та всі його ячейки, що відповідають за час
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),

              // Встановлюємо інтервал оновлення таймеру (1 секунда)
              timeInterval = setInterval(updateClock, 1000);

        // Одразу при завантаженні сторінки, оновлюємо таймер
        updateClock();

        // Функція для оновлення значень таймера
        function updateClock() {
            
            // Передаємо значення залишку часу
            const t = getTimeRemaining(endtime);

            // Оновлюємо значення в DOM за допомогою .innerHtml
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // Зупинка таймеру, як вийде час
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    // Виклик ф-ції оновлення
    setClock(id, deadline);
}

export default timer;