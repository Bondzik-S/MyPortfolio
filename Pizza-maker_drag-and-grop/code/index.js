const pizza = {
  size: "85",
};

const price = {
  size: {
    small: 50,
    mid: 75,
    big: 85,
  },

  ingridients: {
    sauceClassic: 10, // Кетчуп
    sauceBBQ: 11, // BBQ
    sauceRikotta: 12, // Рікотта
    moc1: 5, // Cир звичайний
    moc2: 7, // Сир фета
    moc3: 7, // Моцарелла
    telya: 50, // Телятина
    vetch1: 19, // Помідори
    vetch2: 14, // Гриби
  },
};

window.addEventListener("DOMContentLoaded", () => {
  // так як скріпт підключений в хеді, треба очікувати завантаження html
  // Шукаємо розмір коржу
  document.getElementById("pizza").addEventListener("click", function (ev) {
    //console.log(ev.target.id);
    //Визначаємо обраний корж і записуємо данні в обьєкт
    switch (ev.target.id) {
      case "small":
        pizza.size = price.size.small;
        break;
      case "mid":
        pizza.size = price.size.mid;
        break;
      case "big":
        pizza.size = price.size.big;
        break;
    }
    show(pizza);
  });

  show(pizza);
  btnRun();
});

//метод для виводу інформації про продукт
function show(pizza) {
  //отримали блок ціни
  const price = document.querySelector("#price");

  price.innerText = pizza.size;
}

function btnRun() {
  const btn = document.querySelector("#banner");

  btn.addEventListener("mousemove", () => {
    const coords = {
      X: Math.floor(Math.random() * document.body.clientWidth), // document.body.clientWidth - показує актуальну інформацію про розмір вікна
      Y: Math.floor(Math.random() * document.body.clientHeight),
    };
    //banner === 300px
    //document.body.clientWidth === 1000

    //999 + 300 = 1299

    //if(document.body.clientWidth - 300)
    console.log(coords.X - 300);
    console.log(document.body.clientWidth);
    if (coords.X + 350 > document.body.clientWidth) {
      debugger;
      return;
    }
    if (coords.Y + 150 > document.body.clientHeight) {
      debugger;
      return;
    }

    btn.style.top = coords.Y + "px";
    btn.style.left = coords.X + "px";
  });
}

// drug & drop

window.addEventListener("DOMContentLoaded", function (evt) {
  // document.getElementsByClassName('ingridients').addEventListener('dragstart', function(evt) {
  //     this.style.border = '3px yellow solid';
  //     evt.dataTransfer.effectAllowed = 'move';
  //     evt.dataTransfer.setData(this.id);
  // }, false);

  const pizza_table = this.document.querySelector(".table");
  const ingridients = this.document.querySelectorAll(".ingridients img");

  // Початок перенесення
  const dragStart = function (e) {
    // Додайте клас dragging до тегу img під час початку переносу
    this.classList.add('dragging');
};

  // Кінець перенесення
  const dragEnd = function () {
    console.log("end");
    this.classList.remove('dragging');
  };

  // Попадає в область піци
  const dragOver = function (e) {
    e.preventDefault();
    console.log("over");
  };

  const dragEnter = function(e) {
    e.preventDefault();
    console.log('enter');
  }

  const dragLeave = function() {
    console.log('leave');
  }

  const dragDrop = function(e) {
    //console.log('drop');
    e.preventDefault();

    const ingridient = document.querySelector('.ingridients img.dragging');
    const table = document.querySelector('.table');

    // Створіть клон елемента
    // .cloneNode(true) - клонування елементу
    const clonedIngridient = ingridient.cloneNode(true);

    // Видаліть клас "dragging" з оригінального елемента
    ingridient.classList.remove('dragging');

    // Вставте клонований елемент в .table
    table.appendChild(clonedIngridient);
  }

  ingridients.forEach((ingridient) => {
    ingridient.addEventListener('dragstart', dragStart);
    ingridient.addEventListener('dragend', dragEnd);
});

  ingridients.forEach(function(element) {
    element.outerHTML;
    });

  pizza_table.addEventListener("dragover", dragOver);
  pizza_table.addEventListener("dragenter", dragEnter);
  pizza_table.addEventListener("dragleave", dragLeave);
  pizza_table.addEventListener("drop", dragDrop);

  
  console.log(pizza_table);
  console.log(ingridients);
  
});
