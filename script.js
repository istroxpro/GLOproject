'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollback: 27,
    fullPrice: 0,
    adaptive: true,
    allServicePrices: 0,
    service1: '',
    service2: '',
    servicePercentPrice: 0,
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.allServicePrices);
        console.log(this.getRollbackMessage());
        for (let prop in appData) {
            console.log('appData.' + prop + " = " + appData[prop])
        }
    },
    asking: function () {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
        appData.screens = prompt('Какие типы экранов нужно разобрать?', 'Простые, сложные');

        do {
            appData.screenPrice = prompt('Сколько будет стоить данная работа?')
        } while (!appData.isNumber(appData.screenPrice))

        appData.adaptive = confirm('Нужен ли адаптив на сайте?')
    },
    isNumber: function (num) {
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
    getAllServicePrices: function () {
        let sum = 0;
        for (let i = 0; i < 2; i++) {
            let price = 0
            if (i === 0) {
                appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
            } else if (i === 1) {
                appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
            };
            do {
                price = prompt('Сколько это будет стоить')
            } while (!appData.isNumber(price))
            sum += +price;
        }
        return sum;
    },
    getFullPrice: function () {
        return +appData.screenPrice + +appData.allServicePrices
    },
    getTitle: function () {
        return appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase()
    },
    getServicePercentPrice: function () {
        return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
    },
    start: function () {
        this.asking()
        appData.servicePercentPrice = this.getServicePercentPrice()
        appData.allServicePrices = this.getAllServicePrices()
        appData.title = this.getTitle()
        appData.fullPrice = this.getFullPrice()
        this.logger()
    }
}
// Вызов.
appData.start()