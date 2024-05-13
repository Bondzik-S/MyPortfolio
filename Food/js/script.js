window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });


    
    // Timer

    // Встановлення кінцевої дати відліку
    const deadline = '2024-03-17';

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
            'seconds' : seconds
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
    setClock('.timer', deadline);



    /*___________________________________________________________ */


    // Modal

    // Створюємо змінні для відслідковування натискання на кнопки та змінну на модальне вікно
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    // Перебираємо за допомогою циклу всі кнопки на сторінці та додаємо подію клік, що викликатиме ф-цію openModal()
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Ф-ція відкриття модального вікна
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // Очищає таймер відкриття модального вікна, у випадку, коли користувач сам відкрив модалку завчасно
    }

    // Ф-ція закриття модального вікна
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', closeModal); // Обробник події при натисканні на хрестик, модальне вікно закриватиметься

    // Ф-ція, яка закриватиме модальне вікно при натисканні поза області модального вікна
    modal.addEventListener('click', (e) => {
        if(e.target === modal){
            closeModal();
        }
    });

    // Закриття модального вікна при натисканні ESC
    this.document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    })


    //const modalTimerId = this.setInterval(openModal, 3000);


    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    this.window.addEventListener('scroll', showModalByScroll);



    /*___________________________________________________________ */



    // Клас для сворення карточок товару

    
    // Клас для карточок
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this. src = src; //посилання на фото
            this.alt = alt; // альтернативне фото
            this.title = title; // заголовок
            this.descr = descr; // текст блоку
            this.price = price; // ціна, яка буде генеруватись в залежності від курсу доллара
            this.classes = classes; // REST - оператор для додаткових класів
            this.parent = document.querySelector(parentSelector); // пошук батьківського елементу
            this.transfer = 38; // курс доллара (потім можна буде вказати в залежності від курсу нбу)
            this.changeToUAN(); // метод конвертації валют
        }

        // Конвертація валют
        changeToUAN() {
            this.price = this.price * this.transfer;
        }

        // Додавання елементів до блоку HTML
        render() {
            const element = document.createElement('div'); // сворити дів
            // Створення в змінній тегів для подальшого вставлення

            // classes створений для зберігання додаткових класів. Тут іде перевірка, чи є елементи в масиві, якщо ні, додає дів з класом "menu__item"
            if(this.classes.length === 0){
                this.classes = "menu__item"; // Присвоєння для classes 'menu__item'
                element.classList.add(this.classes); // Додавання класу
            } else {
                this.classes.forEach(className => element.classList.add(className)); // Якщо клас вже тут записаний, то додає той, що по замовчуванню
            }

            element.innerHTML= `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element); // Додавання тегів з інформацією до сайту
        }
    }

    // Створення обʼєктів класу, послідовно додаючи значення кожної змінної в конструкторі
    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render(); // .render() - виклик створеного нами методу, який аппендить дані на сторінку

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render(); // .render() - виклик створеного нами методу, який аппендить дані на сторінку

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render(); // .render() - виклик створеного нами методу, який аппендить дані на сторінку




    /*___________________________________________________________ */




    // Forms

    const forms = document.querySelectorAll('form'); // знаходимо всі форми в документі

    // Список можливих фраз по результатам виконання запиту на сервер
    const message = {
        loading: 'Завантаження',
        success: 'Дякую! Скоро ми з вами звʼяжемося',
        failure: 'Йой, щось пішло не так...'
    };

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Завжди треба відміняти стандартну поведінку, оскільки кнопки будуть надсилати дані в строку адреси

            let statusMessage = document.createElement('div'); // створення діва для виводу повідомлення про статус відправки на сервер
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading; // Виведення повідомлення про завантаження
            form.appendChild(statusMessage); // додавання відповіді сервера про статус

            const request = new XMLHttpRequest(); // Створення об'єкту request для виконання AJAX-запиту: Створюється новий об'єкт XMLHttpRequest.
            request.open('POST', 'server.php'); // Відкривається з'єднання методом POST за адресою 'server.php'.
            request.setRequestHeader('Content-type', 'application/json; charset = utf-8'); // Встановлюється заголовок запиту, що вказує на використання формату JSON для передачі даних.
            const formData = new FormData(form); // створення обʼєкту форм дата де зберігаються всі дані форми

            const object = {}; // створення обʼєкту для збереження даних, отриманих іх форми
            formData.forEach(function(value, key){
                object[key] = value; // присвоєння ключа та значення із відповідей форми
            });
            const json = JSON.stringify(object); // перетворення обʼєкту в рядок JSON

            request.send(json); // відправка даних з форми

            // Обробка статусу відповіді сервера
            request.addEventListener('load', () => {
                if(request.status === 200){ // Якщо сервер отримав дані і відповів
                    console.log(request.response); // вивести в консоль
                    statusMessage.textContent = message.success; // вивести повідомлення про успішну роботу серверу
                    form.reset(); // очистити форму

                    setTimeout(() => {
                        statusMessage.remove(); // вилучення даних із форми через 2 секунди
                    },2000);
                } else {
                    statusMessage.textContent = message.failure; // виведення повідомлення про провал
                }
            });
        });
    }

}); 