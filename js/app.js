//const form = document.querySelector('#form');

const radioProgram = document.querySelectorAll('[type="radio"]');
const totalPercent = document.querySelector('#total-percent');

const baseText = document.querySelector('#base-text');
const itText = document.querySelector('#it-text');
const govText = document.querySelector('#gov-text');
const zeroText = document.querySelector('#zero-text');

const inputCost = document.querySelector('#input-cost');
const inputDownpayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');

const totalMonthPayment = document.querySelector('#total-month-payment');
const totalCost = document.querySelector('#total-cost');





let sum;


totalCost.textContent = inputCost.value + ' ₽';

totalMonthPayment.textContent = sum + ' ₽';

radioProgram.forEach(function (item) {
    
    if (item.checked) {
            totalPercent.textContent = item.value + '%'
        }
    
    item.addEventListener('click', function() {
         
        // Формула ежемесечного платежа
        function pecentSum() {
            sum = +inputCost.value * parseFloat(item.value.replace(',', '.')) / 12 * 1 - 1 + parseFloat(item.value.replace(',', '.') / 12) * (+inputTerm.value) / 12;
            totalMonthPayment.textContent = sum.toFixed(2) + ' ₽';   
        };
        totalPercent.textContent = this.value + '%'
        
     pecentSum()
    });
});


// Слайдер номер 1
const sliderCost = document.getElementById('slider-cost');

const formatForSlider = {
    from: function (formattedValue) {
        return Number(formattedValue);
    },
    to: function(numericValue) {
        return Math.round(numericValue);
    }
};

noUiSlider.create(sliderCost, {
    start: [12000000],
    step: 100000,
    connect: 'lower',
    range: {
        'min': [300000],
        '50%': [10000000, 1000000],
        'max': [100000000]
    },
    format: formatForSlider,
    tooltips: {
        to: function(numericValue) {
            return numericValue.toFixed(1);
        }
    },
    tooltips: false,
});

sliderCost.noUiSlider.on('update', function (values, handle) {
    inputCost.value = values.join(',');
    totalCost.textContent = (inputCost.value - inputDownpayment.value) + ' ₽';
    totalMonthPayment.textContent = (+inputCost.value * 12 * (1 - 1 * (+inputTerm.value) / 12) / +inputTerm.value).toFixed(1) + ' ₽';
});

inputCost.addEventListener('input', function () {
    sliderCost.noUiSlider.set(inputCost.value);
    totalCost.textContent = (inputCost.value - inputDownpayment.value) + ' ₽';
    totalMonthPayment.textContent = (+inputCost.value * 12 * (1 - 1 * (+inputTerm.value) / 12) / +inputTerm.value).toFixed(1) + ' ₽';
});

// ========================================================================================

// Слайдер номер 2
const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: [4800000],
    step: 10000,
    connect: 'lower',
    range: {
        'min': [0],
        'max': [10000000]
    },
    format: formatForSlider,
    tooltips: {
        to: function(numericValue) {
            return numericValue.toFixed(1);
        }
    },
    tooltips: false,
});

sliderDownpayment.noUiSlider.on('update', function (values, handle) {
    inputDownpayment.value = values.join(',');
    totalCost.textContent = (inputCost.value - inputDownpayment.value).toFixed(1) + ' ₽';
})

inputDownpayment.addEventListener('input', function () {
    sliderDownpayment.noUiSlider.set(inputDownpayment.value);
    totalCost.textContent = (inputCost.value - inputDownpayment.value).toFixed(1) + ' ₽';
});

// ========================================================================================

// Слайдер номер 3
const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: [1],
    step: 1,
    connect: 'lower',
    range: {
        'min': [1],
        'max': [30]
    },
    format: formatForSlider,
    tooltips: {
        to: function(numericValue) {
            return numericValue.toFixed(1);
        }
    },
    tooltips: false,
});

sliderTerm.noUiSlider.on('update', function (values, handle) {
    inputTerm.value = values.join(',');
    totalMonthPayment.textContent = (+inputCost.value * 12 * (+inputTerm.value) / 12 / +inputTerm.value).toFixed(1) + ' ₽';
})

inputTerm.addEventListener('input', function () {
    sliderTerm.noUiSlider.set(inputTerm.value);
    totalMonthPayment.textContent = (+inputCost.value * 12 * (+inputTerm.value) / 12 / +inputTerm.value).toFixed(1) + ' ₽';
});

// ========================================================================================


sliderCost.noUiSlider.on('update', function (values, handle) {
    inputDownpayment.value = +inputCost.value * 0.15;
    sliderDownpayment.noUiSlider.set(inputDownpayment.value);
})

inputCost.addEventListener('input', function () {
    inputDownpayment.value = +inputCost.value * 0.15;
    sliderDownpayment.noUiSlider.set(inputDownpayment.value);
});




baseText.textContent = 'от ' + 13.7 + '%';
itText.textContent = 'от '+ 5 + '%';
govText.textContent = 'от '+ 8 + '%';
zeroText.textContent = 'от '+ 14.5 + '%';


//form.addEventListener('input', function() {
//    console.log('input')
//});

