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

        for (let i = 0; i < 2; i++) {
            let name = prompt('Какие типы экранов нужно разобрать?');
            let price = 0;

            while (appData.isNumber(name)) {
                name = prompt('Какие типы экранов нужно разобрать?')
            }

            do {
                appData.screenPrice = prompt('Сколько будет стоить данная работа?')
            } while (!appData.isNumber(appData.screenPrice))
            appData.screens.push({
                id: i,
                name: name,
                price: price
            })
        }


        for (let i = 0; i < 2; i++) {
            let name = prompt('Какой дополнительный тип услуги нужен?');
            let price = 0;

            while (appData.isNumber(name)) {
                name = prompt('Какой дополнительный тип услуги нужен?')
            }

            do {
                price = prompt('Сколько это будет стоить')
            } while (!appData.isNumber(price))

            appData.services[name] = +price
        }

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
    getFullPrice: function () {
        appData.fullPrice = +appData.screenPrice + +appData.allServicePrices
    },
    getTitle: function () {
        appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase()
    },
    getServicePercentPrice: function () {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
    },
    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        };
        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        };
    },
    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.allServicePrices);
        console.log(this.getRollbackMessage());
        console.log(this.screens)
    },
    start: function () {
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