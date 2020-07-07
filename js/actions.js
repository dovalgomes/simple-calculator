
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

    if (lastIsOperation()) {
        position_operation = display.value.length - 1;
        operation = display.value.substring(position_operation, position_operation + 1);
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

        if(input2 && input2.indexOf('.') === -1){
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
    }
}

function invert() {
    if (display.value !== '0') {
        display.value = parseFloat(display.value) * (-1);
    }
}

function equal(resume) {

    try {
        if (operation && !lastIsOperation()) {
            const display_operation = display.value.split(operation);

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

            display.value = result_display.value;
        }

        operation = undefined;
        position_operation = undefined;

        console.log(operation);

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
    return lastCharacter.indexOf('+') !== -1 || lastCharacter.indexOf('-') !== -1 || lastCharacter.indexOf('x') !== -1 || lastCharacter.indexOf('÷') !== -1
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
        reset_ac();
    });
}

function backspace_click() {
    document.getElementById('backspace').addEventListener("click", function () {
        backspace();
    });
}

function bind_events() {
    reset_click();
    numeric_click();
    comma_click();
    backspace_click();

    invert_click();
    sum_click();
    sub_click();
    multiply_click();
    division_click();
    equal_click();
}

// Start Functions
bind_events();