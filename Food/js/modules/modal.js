// Ф-ція відкриття модального вікна
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId); // Очищає таймер відкриття модального вікна, у випадку, коли користувач сам відкрив модалку завчасно

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

// Ф-ція закриття модального вікна
function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    // Створюємо змінні для відслідковування натискання на кнопки та змінну на модальне вікно
    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);
          //modalCloseBtn = document.querySelector('[data-close]');

    // Перебираємо за допомогою циклу всі кнопки на сторінці та додаємо подію клік, що викликатиме ф-цію openModal()
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // всередині обробників подій не можна одразу викликати ф-цію, тому, за потреби використовується наступний синтаксис "() =>", що дозволить нам передати значення в ф-цію без завчасного виклику
    });

    

    //modalCloseBtn.addEventListener('click', closeModal); // Обробник події при натисканні на хрестик, модальне вікно закриватиметься

    // Ф-ція, яка закриватиме модальне вікно при натисканні поза області модального вікна
    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == ''){
            closeModal(modalSelector);
        }
    });

    //Закриття модального вікна при натисканні ESC
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape' && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
    })


    


    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};



