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