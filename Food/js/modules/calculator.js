function calculator() {
    // Calculator

    const result = document.querySelector('.calculating__result span'); // отримуємо span для виводу результату калорій на день
    let sex, height, weight, age, ratio; // створюємо змінні для отримання даних про користувача та додаємо значення по замовчуванню для полу та рівня активності

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('id');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) { // Якщо зоч одне із полів не заповнене, не виводити значення
            result.textContent = '____';
            return;
        }
        if(sex === 'female'){ // Записуємо формули, в яку додаємо ф-цію Math.round, який округлює значення до цілого
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();
    
    // Ф-ція, яка додає та забирає клас активності для статі і активності для того, щоб зелене віконечко перемикалося відповідно до того, що записано в памʼяті
    function initLocalSettings(selector, activeClass){
        const elements = document.querySelectorAll(selector); // отримуємо всі елементи (стать і активність)

        elements.forEach(elem => { // перебираємо
            elem.classList.remove(activeClass); // прибираємо клас активності для всіх
            if(elem.getAttribute('id') === localStorage.getItem('sex')) { // Якщо стать вже записана, додати їй клас активності
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) { // Якщо значення активності вже є в памʼяті, додати йому клас активності
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active'); // передаємо значення класу і id (селектору) і класу активності

    function getStaticInformation (selector, activeClass) {
        const elements = document.querySelectorAll(selector); // прийматиме батьківський елемент для подальшої обробки події клік

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) { // Якщо подія виникне на елементі із атрибутом дата ратіо, то присвоїти значення цього атрибуту до змінної
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else { // Якщо подія виникне на елементі з статтю, то додати значення із айді
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(elem => { // Видалити клас активності дляя всіх елементів
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass); // До елементу, на якому спрацювала подія, додати клас активності

                calcTotal(); // Виклик ф-ції обрахунку для того, щоб очислювання виконувались при кожній зміні в калькуляторі
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // ТУТ НЕ НУЖНО ТОЧКУ? Нет не нужно, одиннаково работает что с ней, что без нее

    function getDynamicInformation(selector) { // Отримання інформації, яку вводить користувач
        const input = document.querySelector(selector); // Отримуємо інпут

        input.addEventListener('input', () => { // Відслідковуємо, де виникла подія
            if(input.value.match(/\D/g)){ // Додаємо перевірку на введення числа, а не інших виразів
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')){ // отримуємо атрибут id і перебираємо, що це саме було і отримуємо велью (те, що ввів користувач)
                case 'height' :
                    height = +input.value; 
                    break;
                
                case 'weight' :
                    weight = +input.value;
                    break;

                case 'age' :
                    age = +input.value;
                    break;
            }

            calcTotal(); // виклик, щоб при будь-яких змінах перераховувались
        });
    }

    // Передаємо класи інпутів
    getDynamicInformation('#height'); 
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calculator;