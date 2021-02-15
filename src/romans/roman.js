// list of all roman characters that will be used
const romans = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }

function numToRom(number) {
    if (!Number.isInteger(number))
        throw new Error('Not a number')
    let accumulator = ''
    // loop through all the roman numerals from high to low
    for (i in romans) {
        while (number >= romans[i]) {
            // Add the character to the accumulator
            accumulator += i;
            // Subtract the value of the character from the number getting converted
            number -= romans[i];
        }
    }
    return accumulator;
}

module.exports = { numToRom }
