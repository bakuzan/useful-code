
function pad(number, width, padChar) {
  padChar = padChar || '0';
  number = number + '';
  return number.length >= width ? number : new Array(width - number.length + 1).join(padChar) + number;
}