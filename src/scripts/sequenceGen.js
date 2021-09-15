// Grabs a single random number from 0-3
const getRandom = () => {
    let num = Math.floor(Math.random() * 4);
    // In the edge case of Math.random returning a 1.0, ensures that a 4 will never be returned
    return num == 4 ? 3 : num;
}

// Returns a consistent sequence to be iterated through
//  Any excess inputs will be ignored; any excess length will be randomized
//  Accepts an optional int and an optional array of ints
//  Returns an array of strings
export const getSequence = (length = 6, inputs = [-1]) => {
    for (let i = 0; i < length; i++) {
        if (!inputs[i] || inputs[i] > 3 || inputs[i] < 0) {
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
                outputs[x] = 'red';
            case 1:
                outputs[x] = 'green';
            case 2:
                outputs[x] = 'blue';
            default:
                outputs[x] = 'yellow';
        }
    }

    return outputs;
}