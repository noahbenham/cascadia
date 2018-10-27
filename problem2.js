/**
 * An assmpution was made that the 9999999.99 example should have had an
 * additional two 9s so the numeric value & text match.
 * 
 * Additionally, "and" should only be used between dollars and cents values
 * so output here will not exactly match exapmle output.
 */

const single = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tennums = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/**
 * Parses and returns the textual value of the integer input.
 * @param {Number} input - Accepts integer values 0 - 999999999
 */
function recursiveDollars(input) {
  const millions = Math.floor(input / 1000000);
  let toSubtract = millions * 1000000;

  const thousands = Math.floor((input - toSubtract) / 1000);
  toSubtract += thousands * 1000;

  const hundreds = Math.floor((input - toSubtract) / 100);
  toSubtract += hundreds * 100;

  const tens = Math.floor((input - toSubtract) / 10);
  toSubtract += tens * 10;

  const ones = Math.floor(input - toSubtract);

  let strToReturn = '';
  if (millions) {
    strToReturn += `${recursiveDollars(millions)} million${thousands || hundreds ? ', ' : ''}`;
  }
  if (thousands) {
    strToReturn += `${recursiveDollars(thousands)} thousand${hundreds ? ', ' : ''}`;
  }
  if (hundreds) {
    strToReturn += `${recursiveDollars(hundreds)} hundred`;
  }

  if (tens === 1) {
    strToReturn += ` ${teens[ones]} `;
  } else if (tens) {
    strToReturn += ` ${tennums[tens - 2]}${ones ? '-' : ' '}`;
  }

  if (ones && tens !== 1) {
    strToReturn += `${single[ones]} `;
  }

  return strToReturn;
}

/**
 * Returns the textual value of the numeric input. Includes capitalization, commas & dashes where appropriate.
 * @throws Error if non-numeric input or input is out of acceptable range.
 * @param {Number} input - Accepts values 0.00 - 999999999.99
 */
function toTextDollars(input) {
  if (typeof input !== 'number') {
    throw new Error('Amount must be a number');
  } else if (input < 0) {
    throw new Error('Amount must be positive');
  } else if (input > 999999999.99) {
    throw new Error('Amount must be lower');
  }

  if (input === 0) {
    return single[input]; // Simply 'zero'
  }

  let strToReturn = recursiveDollars(input);

  const decimal = (input - Math.floor(input)).toFixed(2);
  if (decimal > 0) strToReturn += ` and ${decimal.split('.')[1]}/100`;

  // Remove excess whitespace
  strToReturn = strToReturn.replace(/\s+/g, ' ').trim();
  // Capitalize first letter
  return strToReturn.charAt(0).toUpperCase() + strToReturn.slice(1);
}

const inputs = [
  1000,
  1000000,
  1545120,
  999999999.99,
  245.13,
];

inputs.forEach(input => console.log(toTextDollars(input)));
