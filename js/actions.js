
var display = document.getElementById('display');
var result_display = document.getElementById('result_display');
var numbers = document.getElementsByClassName('number');
var reset = document.getElementById('reset');

var position_operation = 0;
var operation = '';

// Buttons Functions


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
    equal(operation, true);

}

function resumeDisplay(display_operation) {
    if (display_operation.length % 5 === 0) {
        display.value = result_display.value;
    }
}

// Operations Functions

function sum() {
    if (!lastIsOperation()) {
        display.value += '+';
    }
}

function sub() {
    if (!lastIsOperation()) {
        display.value += '-';
    }
}

function multiply() {
    if (!lastIsOperation()) {
        display.value += 'x';
    }
}

function division() {
    if (!lastIsOperation()) {
        display.value += '÷';
    }
}

function invert() {
    if (display.value !== '0') {
        display.value = parseFloat(display.value) * (-1);
    }
}

function equal(operation, resume) {
    if (operation) {
        const display_operation = display.value.split(operation);

        var sucess = false;

        switch (operation) {
            case '+':
                var sum = 0;
                display_operation.map(value => {
                    value = parseFloat(value);
                    sum += value;
                });
                result_display.value = sum;
                break;
            case '-':
                var sub = 0;
                display_operation.map(value => {
                    value = parseFloat(value);
                    sub -= value;
                });
                result_display.value = sub;
                sucess = true;
                break;
            case 'x':
                var multiply = 0;
                var input1 = parseFloat(display_operation[0]);
                var input2 = parseFloat(display_operation[1]);

                multiply = input1 * input2;
                result_display.value = multiply;
                sucess = true;
                break;
            case '÷':
                var division = 0;
                var input1 = parseFloat(display_operation[0]);
                var input2 = parseFloat(display_operation[1]);

                if (input2 === 0) {
                    display.value = 'Impossível Dividir por 0';
                    sucess = false;
                } else {
                    division = input1 / input2;
                    result_display.value = division;
                    sucess = true;
                }
                break;
            default:
                break;
        }

        // resumeDisplay(display_operation);

        if (sucess) {
            display.value = result_display.value;
        }
    }
}


function lastIsOperation() {
    const display_trim = display.value.trim();
    const display_length = display_trim.length;
    const lastCharacter = display_trim.substring(display_length - 1);
    return lastCharacter.indexOf('+') !== -1 || lastCharacter.indexOf('-') !== -1 || lastCharacter.indexOf('x') !== -1 || lastCharacter.indexOf('÷') !== -1
}

// DOM Functions

function invert_click() {
    document.getElementById('invert').addEventListener("click", function () {
        invert();
    });
}

function sum_click() {
    document.getElementById('sum').addEventListener("click", function () {
        sum();
    });
}

function sub_click() {
    document.getElementById('sub').addEventListener("click", function () {
        sub();
    });
}

function division_click() {
    document.getElementById('division').addEventListener("click", function () {
        division();
    });
}

function multiply_click() {
    document.getElementById('multiply').addEventListener("click", function () {
        multiply();
    });
}

function equal_click() {
    document.getElementById('equal').addEventListener("click", function () {
        equal(operation, true);
    })
}

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
        result_display.value = '0';
        operation = '';
        position_operation = 0;
    });
}

function bind_events() {
    reset_click();
    numeric_click();

    invert_click();
    sum_click();
    sub_click();
    multiply_click();
    division_click();
    equal_click();
}

// Start Functions
bind_events();