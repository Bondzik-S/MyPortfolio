const pizza = {
  size: "85"
}

const price = {
  size: {
    small: 50,
    mid: 75,
    big: 85
  },
  sauce: {
    sauceClassic: 10,
    sauceBBQ: 12,
    sauceRikotta: 12
  },
  topping: {
    moc1: 20,
    moc2: 25,
    moc3: 22,
    telya: 35,
    vetch1: 20,
    vetch2: 25
  }
}

let elemsToDelete;

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("pizza").addEventListener("click", function (ev) {
    switch (ev.target.id) {
      case "small": pizza.size = price.size.small;
        break
      case "mid": pizza.size = price.size.mid;
        break
      case "big": pizza.size = price.size.big;
        break
    }
    show(pizza)
  });

  document.querySelectorAll('#info input').forEach((elem) => {
    if (!(elem.classList.contains('button'))) {
      elem.addEventListener('change', validation);
    }
    else if (elem.id === 'btnSubmit') {
      elem.addEventListener('click', (e) => {
        e.preventDefault;
        let isValid = 0;
        document.querySelectorAll('#info input').forEach((elem) => {
          if (elem.classList.contains('green-border') && !(elem.classList.contains('button'))) {
            ++isValid;
          }
        });
        if (isValid === 3) {
          setTimeout(() => {
            document.location.href = './thank_you/index.html';
          }, 1000);
        }
      });
    }
    else if (elem.name === 'cancel') {
      elem.addEventListener('click', () => {
        document.querySelectorAll('#info input').forEach((e) => {
          e.classList.remove("green-border", "red-border");
        });
      });
    }
  });



  const table = document.querySelector('.table');
  const ingridients = document.querySelectorAll('.ingridients img');
  const resultElem = document.querySelector('.result');


  function elementRecovery(id, elem) {
    const myElem = document.querySelector(`#${id}`);
    const div = document.createElement('div');
    div.append(myElem);
    const span = document.createElement('span');
    span.innerText = elem;
    div.append(span);
    const ingrid = document.querySelector('.ingridients');
    if (id.includes('sauce')) {
      ingrid.firstElementChild.after(div);
    }
    else {
      ingrid.append(div);
    }
    delete pizza[elem];
    show(pizza);
  }

  function elementReturn(elem) {
    switch (elem) {
      case "Кетчуп":
        elementRecovery('sauceClassic', elem);
        break
      case "BBQ":
        elementRecovery('sauceBBQ', elem);
        break
      case "Рiкотта":
        elementRecovery('sauceRikotta', elem);
        break
      case "Сир звичайний":
        elementRecovery('moc1', elem);
        break
      case "Сир фета":
        elementRecovery('moc2', elem);
        break
      case "Моцарелла":
        elementRecovery('moc3', elem);
        break
      case "Телятина":
        elementRecovery('telya', elem);
        break
      case "Помiдори":
        elementRecovery('vetch1', elem);
        break
      case "Гриби":
        elementRecovery('vetch2', elem);
        break
    }
  }

  resultElem.addEventListener('click', (e) => {
    if (!(e.target.innerText === ' ❌')) { return }
    elementReturn(e.target.parentElement.firstElementChild.innerText.slice(0, -2));
    e.target.parentElement.remove();
  });

  function addedElementCreation(id, type, text) {
    const div = document.createElement('div');
    const span1 = document.createElement('span');
    span1.innerText = `${text}: `;
    div.append(span1);
    const span2 = document.createElement('span');
    span2.innerText = `+${price[id][type.toString()]} грн`;
    div.append(span2);
    const span3 = document.createElement('span');
    span3.classList.add('_js-delete');
    span3.innerText = ' ❌';
    div.append(span3);
    document.getElementById(id).append(div);

    pizza[text] = price[id][type.toString()];
  }

  function ingridientAdded(type, text) {
    if (type.includes('sauce')) {
      addedElementCreation('sauce', type, text);
    }
    else {
      addedElementCreation('topping', type, text);
    }
  }

  const dragStart = function (e) {
    e.dataTransfer.setData("id", e.target.id);
    e.dataTransfer.setData("ingred", e.target.nextElementSibling.innerText);
    elemsToDelete = e.target.parentElement;
  }
  const dragEnd = function (e) {
  }

  ingridients.forEach((elem) => {
    elem.addEventListener('dragstart', dragStart);
    elem.addEventListener('dragend', dragEnd);
  });

  const dragOver = function (e) {
    e.preventDefault();
  }

  const dragDrop = function (e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("id");
    table.append(document.getElementById(data));
    elemsToDelete.remove();

    ingridientAdded(e.dataTransfer.getData("id"), e.dataTransfer.getData("ingred"));
    show(pizza);
  }

  table.addEventListener('dragover', dragOver);
  table.addEventListener('drop', dragDrop);

  show(pizza);
  btnRun();

  const submitButton = document.querySelector("#btnSubmit");

  submitButton.addEventListener("click", (e) => window.location.replace("./thank-you/index.html"));
});


//метод для виводу інформації про продукт
function show(pizza) {
  const price = document.querySelector("#price");
  price.innerText = `${(Object.values(pizza).reduce((partialSum, a) => Number(partialSum + a), 0))} грн.`;
}

function btnRun() {

  const btn = document.querySelector("#banner");

  btn.addEventListener("mousemove", () => {
    const coords = {
      X: Math.floor(Math.random() * document.body.clientWidth),
      Y: Math.floor(Math.random() * document.body.clientHeight)
    }
    if ((coords.X + 350) > document.body.clientWidth) {
      return
    }
    if ((coords.Y + 150) > document.body.clientHeight) {
      return
    }
    btn.style.top = coords.Y + "px"
    btn.style.left = coords.X + "px"
  });
}

function bordeColor(elem, state) {
  if (state) {
    elem.classList.remove("red-border");
    elem.classList.add("green-border");
  }
  else {
    elem.classList.remove("green-border");
    elem.classList.add("red-border");
  }
}

function patternValidation(pattern, element) {
  if (pattern.test(element.value)) {
    bordeColor(element, true);
  } else {
    bordeColor(element, false);
  }
}

function validation(elem) {
  let p;
  switch (elem.target.name) {
    case ("name"):
      p = /^[а-яіґєї]{2,}$/i;
      patternValidation(p, elem.target);
      break;
    case ("phone"):
      p = /^[\+]380\d{2}\d{3}\d{2}\d{2}$/i;
      patternValidation(p, elem.target);
      break;
    case ("email"):
      p = /^[a-z0-9_.]{3,}@[a-z.0-9]{2,}\.[a-z.]{2,10}$/i;
      patternValidation(p, elem.target);
      break;
  }
}


