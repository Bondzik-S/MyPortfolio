function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    // Створюються змінні для елементів порядкового номеру і стрілочок, індекс елементів слайдеру, скільки всього сторінок, поточний номер сторінки

    // Додавання 0 для 2-го варіанту

    let slideIndex = 1,
        offset = 0; // відповідає за відступи в 2 варіанті
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          // Змінні для 2 варіанту слайдеру
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;// отримання ширини батьківського блоку за допомогою getComputedStyle (примінені вже на сторінці стилі | можна глянути в консолі браузера справа)

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }


    slidesField.style.width = 100 * slides.length + '%'; // додавання ширини блоку (кількість слайдів помножити на 100%)
    slidesField.style.display = 'flex'; // додаємо дісплей флекс, щоб все вишикувалось в рядок
    slidesField.style.transition = '0.5s all'; // додаємо плавність

    slidesWrapper.style.overflow = 'hidden'; // скриваємо всі не актуальні елементи

    // Додавання до кожного слайду фіксовану ширину
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative'; // встановлюємо позшн релатів для навігації в слайдері

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    // Створення кнопочок відносно кількості слайдів у слайдері
    for(let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); // додавання атрибуту
        dot.classList.add('dot');

        if(i == 0){
            dot.style.opacity = 1;
        }
        
        indicators.append(dot);
        dots.push(dot);
    }
    
    function deleteNotDigits(str) {
        return +str.replace(/\D/g, ''); 
    }

    next.addEventListener('click', () => {
        // Якщо дійшли до кінця, повернутись назад
        if(offset == deleteNotDigits(width) * (slides.length - 1)){ // тут width повертається як строка '500px', тому треба використати метод slice, щоб вирізати число, починаючи з нульового індексу, і закінчуюючи -2 символами з кінця
            offset = 0;
        } else {
            offset += deleteNotDigits(width); // додаємо ширину слайду (перехід)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex ++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    prev.addEventListener('click', () => {
        // Якщо повернулись на перший слайд, перейти на останній
        if(offset == 0){ 
            offset = deleteNotDigits(width) * (slides.length - 1); // присвоюємо для офсет значення останнього слайду
            
        } else {
            offset -= deleteNotDigits(width); // не додаємо, а віднімаємо ширину слайду (перехід)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;
        
        if(slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex --;
        }

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = slideIndex;
            }

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = '1';
        })
    })





                            // 1 ВАРІАНТ

    // showSlides(slideIndex);
    /* // Додавання нуля в значення всіх сторінок слайдеру
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) { // Повертатися на 1 елемент після прогортування останнього
            slideIndex = 1;
        }
        if (n < 1) { // Якщо менше 1, то переходити на останній
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.classList.add('hide'));
        slides[slideIndex - 1].classList.remove('hide');
        slides[slideIndex - 1].classList.add('show');


        // Якщо номер поточної сторінки менше 10, додавання 0 на початок
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides (n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    })

    next.addEventListener('click', function () {
        plusSlides(1);
    })*/




                            // 2 ВАРІАНТ
    /* (Зміни в html: обернути слайдери в окремий дів із класом 'offer__slider-inner', тому що в стандартних слайдерах перевертання працює по принципу галереї, тобто заховані діви знаходяться на сторінці по бокам і просто скриті) */

    /*
    Тут принцип роботи наступний: блоку 'offer__slider-wrapper' буде наданий клас 'hide', що означатиме, шо елементи, які не підходять під розмір блоку, будуть просто перекриті (скриті)

    При натисканні на кнопки, ми будемо не переключати слайди, а передвигати їх відносно батьківського блоку
    
    */
}

export default slider;