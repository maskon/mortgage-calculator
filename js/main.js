const form = document.querySelector('#form');

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

const itemValueStart = document.querySelector('input[name="program"]:checked').value;

calculate()

radioProgram.forEach(function (radio) {
    totalPercent.textContent = itemValueStart + ' %';
    radio.addEventListener('change', function() {
        totalPercent.textContent = this.value + ' %'
    })  
});


form.addEventListener('input', function() {
    calculate()
});

function calculate() {
    
    // Сумма кредита
    const totalResult = +inputCost.value - +inputDownpayment.value;
    totalCost.textContent = totalResult.toLocaleString('ru-RU') + ' ₽';
    
    // Количество месяцев
    const NumberMonths = +inputTerm.value * 12;
    
    // Ежемесячный платеж
    const itemValue = document.querySelector('input[name="program"]:checked').value;
    const monthlyPayment = totalResult * ((parseFloat(itemValue) / 1000) + 1 / NumberMonths);
    if (monthlyPayment < 0) {
        totalMonthPayment.textContent = 0 + ' ₽';
        totalCost.textContent = 0 + ' ₽';
        document.querySelector('#param__details--downpayment').classList.add('param__details--error'); 
    }
    
    else {
        totalMonthPayment.textContent = new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(monthlyPayment) + ' ₽';
        document.querySelector('#param__details--downpayment').classList.remove('param__details--error');
    }
    
};
calculate()

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
    start: 12000000,
    step: 100000,
    connect: 'lower',
    range: {
        'min': 300000,
        '50%': [10000000, 1000000],
        'max': 100000000
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
    calculate()
});

inputCost.addEventListener('input', function () {
    sliderCost.noUiSlider.set(inputCost.value);
    calculate()
});

// ========================================================================================

// Слайдер номер 2
const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 0,
    step: 100000,
    connect: 'lower',
    range: {
        'min': 0,
        'max': 10000000
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
    calculate()
})

inputDownpayment.addEventListener('input', function () {
    sliderDownpayment.noUiSlider.set(inputDownpayment.value);
    calculate()
    
});

// ========================================================================================

// Слайдер номер 3
const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    step: 1,
    connect: 'lower',
    range: {
        'min': 1,
        'max': 30
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
    calculate()
})

inputTerm.addEventListener('input', function () {
    sliderTerm.noUiSlider.set(inputTerm.value);
    calculate()
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

