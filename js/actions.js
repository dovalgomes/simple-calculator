
var display = document.getElementById('display');
var result_display = document.getElementById('result_display');
var numbers = document.getElementsByClassName('number');
var reset = document.getElementById('reset');

var position_operation = undefined;
var operation = undefined;

// Buttons Functions


// Dislay Functions
function showDisplayValue(value) {
    if (display.value == '0') {
        display.value = '';
    }

    display.value += value;
}


// Operations Functions

function backspace() {
    if (display.value != '' && display.value != '0') {
        display.value = display.value.substring(0, display.value.length - 1);
        if (display.value === '') {
            display.value = '0';
        }
    } else {
        display.value = '0';
    }
}

function comma() {


    if (operation) {
        const display_operation = display.value.split(operation);
        var input2 = display_operation[1];

        if (input2 && input2.indexOf('.') === -1) {
            display.value += '.';
        }

    } else {
        if (display.value.indexOf('.') === -1) {
            display.value += '.';
        }
    }
}

function send_operation(operator) {

    const splited_display = display.value.split(operator);
    if (splited_display.length > 1) {
        equal(true);
    }

    if (!lastIsOperation()) {
        display.value += operator;

        operation = operator;
    }
}

function invert() {
    if (display.value !== '0') {
        display.value = parseFloat(display.value) * (-1);
    }
}

function equal(resume) {
    console.log(operation);
    try {
        if (operation) {
            const display_operation = display.value.split(operation);

            if (operation == '%') {
                var percent = parseFloat(display.value.replace('%', '')) / 100;
                result_display.value = percent;
            } else {

                if (!lastIsOperation()) {
                    switch (operation) {
                        case '+':
                            var sum = 0;
                            var input1 = parseFloat(display_operation[0]);
                            var input2 = parseFloat(display_operation[1]);

                            sum = input1 + input2;
                            result_display.value = sum;
                            break;
                        case '-':
                            var sub = 0;
                            var input1 = parseFloat(display_operation[0]);
                            var input2 = parseFloat(display_operation[1]);

                            sub = input1 - input2;
                            result_display.value = sub;
                            break;
                        case 'x':
                            var multiply = 0;
                            var input1 = parseFloat(display_operation[0]);
                            var input2 = parseFloat(display_operation[1]);

                            multiply = input1 * input2;
                            result_display.value = multiply;
                            break;
                        case '÷':
                            var division = 0;
                            var input1 = parseFloat(display_operation[0]);
                            var input2 = parseFloat(display_operation[1]);

                            if (input2 === 0) {
                                throw 'Impossível Dividir por 0';
                            } else {
                                division = input1 / input2;
                                result_display.value = division;
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
            display.value = result_display.value;
        }

        operation = undefined;
        position_operation = undefined;

    } catch (err) {
        reset_ac();
        display.value = err;
    }
}

function reset_ac() {
    display.value = '0';
    result_display.value = '0';
    operation = undefined;
    position_operation = undefined;
}

function lastIsOperation() {
    const display_trim = display.value.trim();
    const display_length = display_trim.length;
    const lastCharacter = display_trim.substring(display_length - 1);
    return lastCharacter.indexOf('+') !== -1 || lastCharacter.indexOf('-') !== -1 || lastCharacter.indexOf('x') !== -1 || lastCharacter.indexOf('÷') !== -1 || lastCharacter.indexOf('%') !== -1
}

// DOM Functions
function invert_click() {
    document.getElementById('invert').addEventListener("click", function () {
        invert();
    });
}

function comma_click() {
    document.getElementById('comma').addEventListener("click", function () {
        comma();
    });
}

function sum_click() {
    document.getElementById('sum').addEventListener("click", function () {
        send_operation('+');
    });
}

function sub_click() {
    document.getElementById('sub').addEventListener("click", function () {
        send_operation('-');
    });
}

function division_click() {
    document.getElementById('division').addEventListener("click", function () {
        send_operation('÷');
    });
}

function multiply_click() {
    document.getElementById('multiply').addEventListener("click", function () {
        send_operation('x');
    });
}

function equal_click() {
    document.getElementById('equal').addEventListener("click", function () {
        equal(true);
    })
}

function isOperation(simbol) {
    return simbol === '+' || simbol === '-' || simbol === 'x' || simbol === '%' || simbol === '÷';
}

function numeric_click() {
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener("click", function () {
            showDisplayValue(this.value);
        });
    }
}

function keyboard_event() {
    document.addEventListener('keyup', function (event) {
        if (!isNaN(event.key)) {
            showDisplayValue(event.key);
        } else if (event.key === '.' || event.key === ',') {
            comma();
        } else if (isOperation(event.key)) {
            send_operation(event.key);
        } else if (event.key === '=') {
            equal();
        } else if (event.key === 'Backspace') {
            backspace();
        }
    })
}

function reset_click() {
    reset.addEventListener("click", function () {
        reset_ac();
    });
}

function backspace_click() {
    document.getElementById('backspace').addEventListener("click", function () {
        backspace();
    });
}

function percent_click() {
    document.getElementById('percent').addEventListener("click", function () {
        send_operation('%');
    });
}


function bind_events() {
    reset_click();
    numeric_click();
    comma_click();
    backspace_click();
    percent_click();

    keyboard_event();

    invert_click();
    sum_click();
    sub_click();
    multiply_click();
    division_click();
    equal_click();
}

// Start Functions
bind_events();