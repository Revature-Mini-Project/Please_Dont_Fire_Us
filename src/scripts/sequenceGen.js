// Intended to allow for future expansion beyond 4 inputs
const RESULTS = 4;
// Constants for the return strings
const ZERO = 'red', ONE = 'green', TWO = 'blue', THREE = 'yellow';
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
//  Accepts an optional int and an optional array of ints
//  Returns an array of strings
export const getSequence = (length = 6, inputs = [-1]) => {
    if (length < MIN) length = MIN; // Defaults to 1 in the event of a negative length
    if (length > MAX) length = MAX; // Defaults to 30 in the event of an excessive length
    for (let i = 0; i < length; i++) {
        if (!inputs[i] || inputs[i] > RESULTS - 1 || inputs[i] < 0) {
            inputs[i] = getRandom();
        }
    }
    // Cuts out any excess inputs provided
    inputs.length = length;

    // Casts integers to strings
    let outputs = [''];
    for (let x in inputs) {
        switch (inputs[x]) {
            case 0:
                outputs[x] = ZERO;
            case 1:
                outputs[x] = ONE;
            case 2:
                outputs[x] = TWO;
            default:
                outputs[x] = THREE;
        }
    }

    return outputs;
}