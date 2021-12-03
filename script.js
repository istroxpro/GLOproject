'use strict';

let title = 'Название проекта';
let screens = 'Простые, Сложные, Интерактивные'
let screenPrice = 17;
let rollback = 50;
let fullPrice = 500;
let adaptive = true;
let allServicePrices;

title = prompt('Как называется ваш проект?');
screens = prompt('Какие типы экранов нужно разобрать?');
screenPrice = +prompt('Сколько будет стоить данная работа?');
adaptive = confirm('Нужен ли адаптив на сайте?')

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let servicePercentPrice = fullPrice - Math.ceil(rollback);


const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

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

const getAllServicePrices = function (a, b) {
    return a + b
};


function getFullPrice(a, b) {
    return a + b
};


function getTitle(str) {
    if (!str) return str;
    return str = str[0].toUpperCase() + str.slice(1).toLowerCase()
};


const getServicePercentPrices = function (a, b) {
    return a - Math.ceil(b)
}

servicePercentPrice = getServicePercentPrices(fullPrice, rollback);
allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
title = getTitle(title);
fullPrice = getFullPrice(screenPrice, allServicePrices);
showTypeOf(title);
showTypeOf(fullPrice);
showTypeOf(adaptive);
screens.toLocaleLowerCase();
screens.split(', ');

console.log(getRollbackMessage(fullPrice));
console.log(`Стоимость верстки экранов ${screenPrice} рублей`)
console.log(`Стоимость разработки сайта ${fullPrice} рублей`)
console.log(screens.split(', '));
console.log(servicePercentPrice);