/* 

* В папке calculator дана верстка макета калькулятора. Необходимо сделать этот калькулятор рабочим.

* При клике на клавиши с цифрами - набор введенных цифр должен быть показан на табло калькулятора.

* При клике на знаки операторов (`*`, `/`, `+`, `-`) на табло ничего не происходит - программа ждет введения второго числа для выполнения операции.

* Если пользователь ввел одно число, выбрал оператор, и ввел второе число, то при нажатии как кнопки `=`, так и любого из операторов, в табло должен появиться результат выполенния предыдущего выражения.

* При нажатии клавиш `M+` или `M-` в левой части табло необходимо показать маленькую букву `m` - это значит, что в памяти хранится число. Нажатие на `MRC` покажет число из памяти на экране. Повторное нажатие `MRC` должно очищать память. 

* Прибрати disabled на "=" при натиськанні хоч на одну цифру

*/

document.addEventListener("DOMContentLoaded", function () {
  let display = document.querySelector(".display input");

  let memory = 0;
  let operator = "";
  let waitingForSecondOperand = false;

  // Ф-ція для оновлення вмісту калькулятора
  const updateDisplay = (value) => {
    display.value = value;
  };

  // Функція для обробки кліку по кнопці калькулятора
  const handleButtonClick = (event) => {
    let buttonValue = event.target.value;
    document.querySelector("#eq").removeAttribute('disabled');

    if (!isNaN(buttonValue)) {
      if (waitingForSecondOperand) {
        updateDisplay(buttonValue);
        waitingForSecondOperand = false;
      } else {
        updateDisplay(display.value + buttonValue);
      }
    } else if (buttonValue === ".") {
      // Якщо кнопка - крапка, додаємо її до значення, якщо воно ще не містить крапку
      if (!display.value.includes(".")) {
        updateDisplay(display.value + buttonValue);
      }
    } else if (buttonValue === "C") {
      updateDisplay("");
    } else if (buttonValue === "=") {
      let currentValue = parseFloat(display.value);

      switch (operator) {
        case "+":
          currentValue = memory + currentValue;
          break;
        case "-":
          currentValue = memory - currentValue;
          break;
        case "*":
          currentValue = memory * currentValue;
          break;
        case "/":
          currentValue = memory / currentValue;
      }

      // Очищаємо змінні для пам'яті та оператора
      memory = 0;
      operator = "";
      waitingForSecondOperand = false;

      // Оновлюємо вміст екрану з результатом
      updateDisplay(currentValue);
    } else if (buttonValue === "m+" || buttonValue === "m-") {
      memory =
        buttonValue === "m+"
          ? memory + parseFloat(display.value)
          : memory - parseFloat(display.value);
    } else if (buttonValue === "mrc") {
      updateDisplay(memory);
    } else {
      // Якщо кнопка - оператор, встановлюємо його та зберігаємо поточне значення в пам'яті
      operator = buttonValue;
      memory = parseFloat(display.value);
      waitingForSecondOperand = true;
    }
  };

  let buttons = document.querySelectorAll(".button");

  buttons.forEach(function (button) {
    button.addEventListener("click", handleButtonClick);
  });
});
