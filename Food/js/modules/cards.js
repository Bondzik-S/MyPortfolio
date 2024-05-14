import { getResource } from "../services/services";

function cards() {
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

    getResource('http://localhost:4000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // деструктиризація | витягання всіх даних із бази

                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });


    // axios.get('http://localhost:4000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });


    // 2 ВАРІАНТ

    // getResource('http://localhost:4000/menu')
    //     .then(data => createCard(data));


    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     })
    // }
}

export default cards;