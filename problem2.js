const single = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const tennums = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function recursiveText(input) {
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
    strToReturn += `${recursiveText(millions)} million`;
  }
  if (thousands) {
    strToReturn += `${recursiveText(thousands)} thousand`;
  }
  if (hundreds) {
    strToReturn += `${recursiveText(hundreds)} hundred`;
  }

  if (tens === 1) {
    strToReturn += ` ${teens[ones]} `;
  } else if (tens) {
    strToReturn += ` ${tennums[tens - 2]} `;
  }

  if (ones && tens !== 1) {
    strToReturn += ` ${single[ones]} `;
  }

  return strToReturn;
}

function toTextDollars(input) {
  if (typeof input !== 'number') {
    throw new Error('Amount must be a number');
  } else if (input < 0) {
    throw new Error('Amount must be positive');
  } else if (input > 999999999.99) {
    throw new Error('Amount must be lower');
  }

  if (input === 0) {
    return single[input];
  }

  const dollars = recursiveText(input);

  let strToReturn = '';
  if (dollars) strToReturn += dollars;

  const decimalString = `${(input - Math.floor(input)).toFixed(2)}/100`.split('.')[1];
  if (decimalString) strToReturn += ` and ${decimalString}`;

  return strToReturn.replace(/\s+/g, ' ').trim();
}

const inputs = [
  1000,
  1000000,
  1545120,
  9999999.99,
  245.13,
];

inputs.forEach(input => console.log(toTextDollars(input)));
