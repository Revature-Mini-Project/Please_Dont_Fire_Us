// Intended to allow for future expansion beyond 4 inputs
const RESULTS = 4;

// Constants for the return strings
export const RED = 'red', GREEN = 'green', BLUE = 'blue', YELLOW = 'yellow';

// Constants for the max/min length of the return array
const MAX = 50, MIN = 1;

// Grabs a single random number from 0-RESULTS
const getRandom = () => {
    let num = Math.floor(Math.random() * RESULTS) + 1;
    // In the edge case of Math.random returning a 1.0, ensures that a 5 will never be returned
    return num === RESULTS + 1 ? RESULTS : num;
}

// Returns a consistent sequence to be iterated through
//  Any excess inputs will be ignored; any excess length will be randomized
/**
 * Takes in an optional int, and an optional array of strings
 * @returns an array of strings
 */
export const getSequence = (length = 6, inputs = []) => {
    inputs = uncast(inputs);
    if (length < MIN) length = MIN; // Defaults to 1 in the event of a negative length
    if (length > MAX) length = MAX; // Defaults to 50 in the event of an excessive length
    for (let i = 0; i < length; i++) {
        if (!inputs[i] || inputs[i] > RESULTS || inputs[i] < 0) {
            inputs[i] = getRandom();
        }
    }
    // Cuts out any excess inputs provided
    inputs.length = length;

    console.log(`Returning ${cast(inputs)}`)
    return cast(inputs);
}


// Casts inputs from numerals to strings
const cast = (input = [0]) => {
    let outputs = [''];
    for (let x in input) {
        switch (input[x]) {
            case 1:
                outputs[x] = RED;
                break;
            case 2:
                outputs[x] = GREEN;
                break;
            case 3:
                outputs[x] = BLUE;
                break;
            case 4:
                outputs[x] = YELLOW;
                break;
            default:
                outputs[x] = '';
        }
    }

    return outputs;
}

// Casts inputs from strings to numerals
const uncast = (input = [RED]) => {
    let outputs = [0];
    for (let x in input) {
        switch (input[x]) {
            case RED:
                outputs[x] = 1;
                break;
            case GREEN:
                outputs[x] = 2;
                break;
            case BLUE:
                outputs[x] = 3;
                break;
            case YELLOW:
                outputs[x] = 4;
                break;
            default:
                outputs[x] = -1
        }
    }

    return outputs;
}