'use strict';
const title = document.getElementsByTagName('h1')[0];
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
const plusButton = document.querySelector('.screen-btn');
let otherItemsPercent = document.querySelectorAll('.other-items.percent');
let otherItemsNumber = document.querySelectorAll('.other-items.number');
let inputRange = document.querySelector('.rollback input[type="range"]');
let rangeValue = document.querySelector('.rollback .range-value');
let totalInput = Array.from(document.getElementsByClassName('total-input'));
let screens = document.querySelectorAll('.screen');



const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 24,
    fullPrice: 0,
    adaptive: true,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    servicesNumber: {},
    servicesPercent: {},
    servicePercentPrice: 0,
    totalCount: 0,
    init: function () {
        appData.addTitle()
        appData.start()
        startBtn.addEventListener('click', appData.btnBlock)
        plusButton.addEventListener('click', appData.addScreenBlock)
        inputRange.addEventListener('input', appData.getRollback)
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreens: function (num) {
        screens = document.querySelectorAll('.screen')

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            const selectName = select.options[select.selectedIndex].textContent
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * input.value,
                count: +input.value
            })
        })
    },
    // Блокируем кнопку в случае, если не введены значения.
    btnBlock: function () {
        appData.isError = false;
        screens = document.querySelectorAll('.screen')
        screens.forEach(function (screen) {
            const select = screen.querySelector('select')
            const input = screen.querySelector('input')
            if (select.value === '' || input.value === '') {
                appData.isError = true
            }
        })
        if (!appData.isError) {
            appData.start()
        } else {
            alert('Сделай выбор')
        }
    },
    addServices: function () {
        otherItemsPercent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value
            }
        })
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value
            }
        })

    },
    addScreenBlock: function () { // Добавляем новый скриблок по клику на +
        const cloneScreen = screens[0].cloneNode(true)
        screens[screens.length - 1].after(cloneScreen)
    },
    start: function () {
        appData.addScreens()
        appData.addServices()
        appData.addPrices()
        // this.getServicePercentPrice()
        // this.logger()
        appData.showResult()
    },
    showResult: function () {
        totalInput[0].value = appData.screenPrice;
        totalInput[2].value = appData.servicePricesPercent + appData.servicePricesNumber;
        totalInput[3].value = appData.fullPrice;
        totalInput[4].value = appData.servicePercentPrice;
        totalInput[1].value = appData.totalCount
    },

    getRollback: function () {
        rangeValue.textContent = inputRange.value //+ ' %'
        appData.rollback = rangeValue.textContent
    },

    addPrices: function () {
        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price
        };
        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        };
        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
        };

        appData.fullPrice = +appData.screenPrice + +appData.servicePricesPercent + appData.servicePricesNumber;

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
        // Считаю количество экранов
        appData.totalCount = appData.screens.reduce((sum, current) => sum + current.count, 0);
    },
    logger: function () { // Запускаем метод логгера
        console.log(this.fullPrice);
        console.log(this.allServicePrices);
        console.log(this.screens)
    },
}
// Вызов.
appData.init()