
const romans = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }

async function numToRom(number) {
    let output = ''
    for (i in romans) {
        while (number >= romans[i]) {
            output += i;
            number -= romans[i];
        }
    }
    return output;
}

module.exports = { numToRom }
