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
        this.addTitle();
        this.start();
        startBtn.addEventListener('click', this.btnBlock);
        startBtn.addEventListener('click', this.btnChange);
        resetBtn.addEventListener('click', this.reset);
        plusButton.addEventListener('click', this.addScreenBlock);
        inputRange.addEventListener('input', this.getRollback);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addScreens: function (num) {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;
            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * input.value,
                count: +input.value
            });
        });
    },
    reset: function reset() {
        document.querySelectorAll('input[type="text"]').forEach(el => el.value = '');
        document.querySelectorAll('select').forEach(el => el.disabled = false);
        document.querySelectorAll('select').forEach(el => el.value = '');
        document.querySelectorAll('input[type="text"]').forEach(el => el.disabled = false);
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.disabled = false);
        document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
        startBtn.style.display = 'block';
        resetBtn.style.display = 'none';
        screens.forEach((item, i) => {
            const select = item.querySelector('select');
            const input = item.querySelector('input');
            if (i > 0) {
                item.remove()
            }
        })
        appData.start()
    },
    // Блокируем кнопку в случае, если не введены значения.
    btnBlock: function () {
        appData.isError = false;
        screens = document.querySelectorAll('.screen');
        screens.forEach(function (screen) {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            if (select.value === '' || input.value === '') {
                appData.isError = true;
            }
        });
        if (!appData.isError) {
            appData.start();
        } else {
            alert('Сделай выбор');
        }
    },
    btnChange: function () {
        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
        const inputs = document.querySelectorAll('input[type=text]');
        const selects = document.querySelectorAll('select');
        const check = document.querySelectorAll('input[type=checkbox]')
        inputs.forEach((elem) => {
            elem.disabled = true
        });
        selects.forEach((elem) => {
            elem.disabled = true
        });
        check.forEach((elem) => {
            elem.disabled = true
        });
    },
    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        });
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');
            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        });

    },
    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens[screens.length - 1].after(cloneScreen);
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        // this.getServicePercentPrice()
        // this.logger()
        this.showResult();
    },
    showResult: function () {
        totalInput[0].value = this.screenPrice;
        totalInput[2].value = this.servicePricesPercent + this.servicePricesNumber;
        totalInput[3].value = this.fullPrice;
        totalInput[4].value = this.servicePercentPrice;
        totalInput[1].value = this.totalCount;
    },

    getRollback: function () {
        rangeValue.textContent = inputRange.value; //+ ' %'
        this.rollback = rangeValue.textContent;
    },

    addPrices: function () {
        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        };
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        };
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        };

        this.fullPrice = +this.screenPrice + +this.servicePricesPercent + this.servicePricesNumber;

        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));
        // Считаю количество экранов
        this.totalCount = this.screens.reduce((sum, current) => sum + current.count, 0);
    },
    logger: function () { // Запускаем метод логгера
        console.log(this.fullPrice);
        console.log(this.allServicePrices);
        console.log(this.screens)
    },
}
// Вызов.
appData.init()