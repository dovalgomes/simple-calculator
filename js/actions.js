
var display = document.getElementById('display');
var numbers = document.getElementsByClassName('number');
var reset = document.getElementById('reset');

// Buttons Functions
function addClickNumber() {
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function () {
            showDisplayValue(this.value);
        })
    }
}

function acResetClick() {
    reset.addEventListener("click", function () {
        display.value = '0';
    });
}

// Dislay Functions
function showDisplayValue(value) {
    if (display.value == '0') {
        display.value = '';
    }

    if (!isNaN(value)) {
        display.value += value;
    }
}

// Operations Functions

// DOM Functions
function setEvents() {
    addClickNumber();
    acResetClick();
}

// Start Functions
setEvents();