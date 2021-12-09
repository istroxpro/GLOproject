'use strict';

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 27,
    fullPrice: 0,
    adaptive: true,
    allServicePrices: 0,
    services: {},
    servicePercentPrice: 0,

    asking: function () {
        do {
            appData.title = prompt('Как называется ваш проект?');
        } while (appData.isNumber(appData.title))

        for (let i = 0; i < 2; i++) { // Цикл заставляет задать вопрос дважды
            let name = prompt('Какие типы экранов нужно разобрать?');
            let price = 0;

            while (appData.isNumber(name)) {
                name = prompt('Какие типы экранов нужно разобрать?')
            }

            do {
                price = prompt('Сколько будет стоить данная работа?')
            } while (!appData.isNumber(price))
            appData.screens.push({
                id: i,
                name: name,
                price: price
            })
        };

        for (let i = 0; i < 2; i++) { // Цикл заставляет задать вопрос дважды
            let name = prompt('Какой дополнительный тип услуги нужен?');
            let price = 0;

            while (appData.isNumber(name)) {
                name = prompt('Какой дополнительный тип услуги нужен?')
            } // проверка на строку

            do {
                price = prompt('Сколько это будет стоить')
            } while (!appData.isNumber(price))
            // проверка на число
            appData.services[name] = +price
        };

        appData.adaptive = confirm('Нужен ли адаптив на сайте?')
    },
    isNumber: function (num) { // функция для проверки на число
        return !isNaN(parseFloat(num)) && isFinite(num)
    },
    getRollbackMessage: function (price) {
        if (price >= 30000) {
            return 'Даем скидку в 10%'
        } else if (price >= 15000 && price < 30000) {
            return 'Даем скидку в 5%'
        } else if (price < 15000 && price >= 0) {
            return 'Скидка не предусмотрена'
        } else {
            return 'Что-то пошло не так'
        };
    },
    getFullPrice: function () { // Достаем полную цену разработки
        appData.fullPrice = +appData.screenPrice + +appData.allServicePrices
    },
    getTitle: function () { // Заставляем название писаться с большой буквы, весь остальной регистр в нижний
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase()
    },
    getServicePercentPrice: function () { // Получаем цену за вычетом отката (ПРЕДПОЛАГАЮ ЗДЕСЬ ОШИБКА)
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
    },
    addPrices: function () { // Вычисляем сумму затрат на экраны
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price // Добавляем при помощи += в screenPrice данные о цене всех экранов
        };
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        };
    },
    logger: function () { // Запускаем метод логгера
        console.log(this.fullPrice);
        console.log(this.allServicePrices);
        console.log(this.getRollbackMessage(this.fullprice));
        console.log(this.screens)
    },
    start: function () { // Этим методом мы совершаем все присваивания и запускаем цикл вопросов.
        this.asking()
        this.addPrices()
        this.getServicePercentPrice()
        this.getTitle()
        this.getFullPrice()
        this.logger()
    }
}
// Вызов.
appData.start()