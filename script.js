let title = 'Название проекта';
let screens = 'Простые, Сложные, Интерактивные'
let screenPrice = 17;
let rollback = 50;
let fullPrice = 500;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(`Стоимость верстки экранов ${screenPrice} рублей`)
console.log(`Стоимость разработки сайта ${fullPrice} рублей`)
screens.toLocaleLowerCase();
screens.split(', ');
console.log(screens);
console.log(fullPrice * (rollback / 100))
// Третий урок
title = prompt('Как называется ваш проект?');
screens = prompt('Какие типы экранов нужно разобрать?');
screenPrice = +prompt('Сколько будет стоить данная работа?');
adaptive = confirm('Нужен ли адаптив на сайте?')
// Создаю переменные с вопросами о дополнительных услугах
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');
// Вычисление итоговой стоимости работ
fullPrice = screenPrice + servicePrice1 + servicePrice2;
// Итоговая стоимость за вычетом отката
let servicePercentPrice = fullPrice - Math.ceil(rollback);
console.log(servicePercentPrice);
// Конструкция условий
if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%')
} else if (fullPrice >= 15000 && fullPrice < 30000) {
    console.log('Даем скидку в 5%')
} else if (fullPrice < 15000 && fullPrice >= 0) {
    console.log('Скидка не предусмотрена')
} else {
    console.log('Что-то пошло не так')
};