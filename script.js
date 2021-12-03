'use strict';
// Блок для объявления функций.
let title;
let screens;
let screenPrice;
let rollback = 50;
let fullPrice;
let adaptive;
let allServicePrices;
let service1;
let service2;
let servicePercentPrice;

// Проверка на введение в модальное окно для ответа числового значения.
const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
};

// Функция, которая позволяет нам своим вызовом задать необходимые вопросы и записать ответы в переменные.
const asking = function () {
    title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
    screens = prompt('Какие типы экранов нужно разобрать?', 'Простые, сложные');

    // цикл, который задействует ранее написанную функцию проверки числового значения и задает вопрос.
    do {
        screenPrice = prompt('Сколько будет стоить данная работа?')
    } while (!isNumber(screenPrice))

    adaptive = confirm('Нужен ли адаптив на сайте?')
}

// Функция позволяет узнать тип данных каждой переменной, которую мы укажем ниже.
const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

// Функция позволяет узнать размер скидки, которую мы предложим в зависимости от входящих параметров.
const getRollbackMessage = function (price) {
    if (price >= 30000) {
        return 'Даем скидку в 10%'
    } else if (price >= 15000 && price < 30000) {
        return 'Даем скидку в 5%'
    } else if (price < 15000 && price >= 0) {
        return 'Скидка не предусмотрена'
    } else {
        return 'Что-то пошло не так'
    };
};

// Функция с циклом, позволяет задать вопросы ограниченное количество раз и записать ответы в переменные.
const getAllServicePrices = function () {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            service1 = prompt('Какой дополнительный тип услуги нужен?')
        } else if (i === 1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?')
        };
        sum += (() => {
            let n;
            do {
                n = prompt('Сколько это будет стоить?');
            } while (!isNumber(n));
            return +n;
        })();
    }
    return sum;
};

// Получаем конечную стоимость.
function getFullPrice() {
    return +screenPrice + +allServicePrices
};

// Заставили название проекта писаться с заглавной буквы, а весь остальной регистр переводится в нижний.
function getTitle(str) {
    if (!str) return str;
    return str = str[0].toUpperCase() + str.slice(1).toLowerCase()
};

// Показываем сумму отката.
const getServicePercentPrices = function () {
    return +fullPrice - rollback
}

// Вызываем функции.
asking();
servicePercentPrice = getServicePercentPrices();
allServicePrices = getAllServicePrices();
title = getTitle(title);
fullPrice = getFullPrice();
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
screens.toLowerCase();
screens.split(', ');

// Логи
console.log(getRollbackMessage(fullPrice));
console.log(`Стоимость верстки экранов ${screenPrice} рублей`)
console.log(`Стоимость разработки сайта ${fullPrice} рублей`)
console.log(screens.split(', '));
console.log(servicePercentPrice);