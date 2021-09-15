// Intended to allow for future expansion beyond 4 inputs
const RESULTS = 4;

// Constants for the return strings
export const ZERO = 'red', ONE = 'green', TWO = 'blue', THREE = 'yellow';

// Constants for the max/min length of the return array
const MAX = 30, MIN = 1;

// Grabs a single random number from 0-RESULTS
const getRandom = () => {
    let num = Math.floor(Math.random() * RESULTS);
    // In the edge case of Math.random returning a 1.0, ensures that a 4 will never be returned
    return num == RESULTS ? RESULTS - 1 : num;
}

// Returns a consistent sequence to be iterated through
//  Any excess inputs will be ignored; any excess length will be randomized
//  Accepts an optional int and an optional array of strings
//  Returns an array of strings
export const getSequence = (length = 6, inputs = [ZERO]) => {
    inputs = uncast(inputs);
    if (length < MIN) length = MIN; // Defaults to 1 in the event of a negative length
    if (length > MAX) length = MAX; // Defaults to 30 in the event of an excessive length
    for (let i = 0; i < length; i++) {
        if (!inputs[i] || inputs[i] > RESULTS - 1 || inputs[i] < 0) {
            inputs[i] = getRandom();
        }
    }
    // Cuts out any excess inputs provided
    inputs.length = length;

    return cast(inputs);
}


// Casts inputs from numerals to strings
const cast = (input = [0]) => {
    let outputs = [''];
    for (let x in input) {
        switch (input[x]) {
            case 0:
                outputs[x] = ZERO;
            case 1:
                outputs[x] = ONE;
            case 2:
                outputs[x] = TWO;
            case 3:
                outputs[x] = THREE;
            default:
                outputs[x] = '';
        }
    }

    return outputs;
}

// Casts inputs from strings to numerals
const uncast = (input = [ZERO]) => {
    let outputs = [0];
    for (let x in input) {
        switch (input[x]) {
            case ZERO:
                outputs[x] = 0;
            case ONE:
                outputs[x] = 1;
            case TWO:
                outputs[x] = 2;
            case THREE:
                outputs[x] = 3;
            default:
                outputs[x] = -1
        }
    }

    return outputs;
}