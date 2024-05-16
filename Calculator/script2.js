// Чекаємо, коли DOM буде повністю завантажений перед виконанням коду
document.addEventListener("DOMContentLoaded", function () {
    // Знаходимо елемент вводу з класом display і типом input
    let display = document.querySelector(".display input");
    // Змінні для зберігання числа в пам'яті, оператора та стану очікування другого операнда
    let memory = 0;
    let operator = "";
    let waitingForSecondOperand = false;
  
    // Функція для оновлення вмісту екрану калькулятора
    function updateDisplay(value) {
      display.value = value;
    }
  
    // Функція для обробки кліку по кнопці калькулятора
    function handleButtonClick(event) {
      // Отримуємо значення кнопки, на яку клікнули
      let buttonValue = event.target.value;
  
      // Перевіряємо, чи натискана кнопка - цифра
      if (!isNaN(buttonValue)) {
        // Якщо очікується другий операнд, то встановлюємо нове значення
        if (waitingForSecondOperand) {
          updateDisplay(buttonValue);
          waitingForSecondOperand = false;
        } else {
          // Якщо не очікується другий операнд, додаємо цифру до поточного значення
          updateDisplay(display.value + buttonValue);
        }
      } else if (buttonValue === ".") {
        // Якщо кнопка - крапка, додаємо її до значення, якщо воно ще не містить крапку
        if (!display.value.includes(".")) {
          updateDisplay(display.value + buttonValue);
        }
      } else if (buttonValue === "C") {
        // Якщо кнопка - C (очищення), обнуляємо вміст екрану
        updateDisplay("");
      } else if (buttonValue === "=") {
        // Якщо кнопка - = (рівно), виконуємо попередню операцію та оновлюємо екран
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
            break;
        }
  
        // Очищаємо змінні для пам'яті та оператора
        memory = 0;
        operator = "";
        waitingForSecondOperand = false;
  
        // Оновлюємо вміст екрану з результатом
        updateDisplay(currentValue);
      } else if (buttonValue === "m+" || buttonValue === "m-") {
        // Якщо кнопка - m+ або m-, додаємо чи віднімаємо значення на екрані до/з пам'яті
        memory = buttonValue === "m+" ? memory + parseFloat(display.value) : memory - parseFloat(display.value);
      } else if (buttonValue === "mrc") {
        // Якщо кнопка - mrc (читання пам'яті), оновлюємо екран значенням з пам'яті
        updateDisplay(memory);
      } else {
        // Якщо кнопка - оператор, встановлюємо його та зберігаємо поточне значення в пам'яті
        operator = buttonValue;
        memory = parseFloat(display.value);
        waitingForSecondOperand = true;
      }
    }
  
    // Знаходимо всі кнопки калькулятора
    let buttons = document.querySelectorAll(".button");
    // Додаємо обробник кліку для кожної кнопки
    buttons.forEach(function (button) {
      button.addEventListener("click", handleButtonClick);
    });
  });
  