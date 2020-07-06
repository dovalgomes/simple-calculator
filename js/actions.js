
var display = document.getElementById('display');
var result_display = document.getElementById('result_display');
var numbers = document.getElementsByClassName('number');
var reset = document.getElementById('reset');

var position_operation = 0;
var operation = '';

// Buttons Functions
function numeric_click() {
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function () {
            showDisplayValue(this.value);
        })
    }
}

function reset_click() {
    reset.addEventListener("click", function () {
        display.value = '0';
    });
}

// Dislay Functions
function showDisplayValue(value) {
    if (display.value == '0') {
        display.value = '';
    }

    if (lastIsOperation()) {
        position_operation = display.value.length - 1;
        operation = display.value.substring(position_operation, position_operation + 1);
    }

    display.value += value;

    equal(operation);

}

// Operations Functions

function sum_click() {
    document.getElementById('sum').addEventListener("click", function () {
        sum();
    });
}

function equal_click() {
    document.getElementById('equal').addEventListener("click", function () {
        equal(operation, true);
    })
}

function sum() {
    if (!lastIsOperation()) {
        display.value += '+';
    }
}

function equal(operation, resume) {
    if (operation) {
        const display_operation = display.value.split(operation);

        switch (operation) {
            case '+':
                var sum = 0;
                display_operation.map(value => {
                    sum += parseFloat(value);
                });
                result_display.value = sum;
                break;
            default:
                break;
        }
        resumeDisplay(display_operation);
    }

    if (resume) {
        display.value = result_display.value;
    }
}

function resumeDisplay(display_operation) {
    if (display_operation.length % 5 === 0) {
        display.value = result_display.value;
    }
}

function lastIsOperation() {
    const display_trim = display.value.trim();
    const display_length = display_trim.length;
    const lastCharacter = display_trim.substring(display_length - 1);
    return lastCharacter.indexOf('+') !== -1 || lastCharacter.indexOf('-') !== -1 || lastCharacter.indexOf('x') !== -1 || lastCharacter.indexOf('÷') !== -1
}

// DOM Functions
function bind_events() {
    numeric_click();
    reset_click();
    sum_click();
    equal_click();
}

// Start Functions
bind_events();