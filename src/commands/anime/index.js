/**
 * Returns the input given, defaulting to 'N/A' if the value is falsey.
 *
 * @example
 * defaultValue('hi') // "hi"
 * defaultValue('') // "N/A"
 * defaultValue(null) // "N/A"
 *
 * @param {string} value - The input to default to 'N/A' if falsey.
 * @returns {string} The defaulted string.
 */
function defaultValue(value) {
  return value || 'N/A';
}

module.exports = {
  defaultValue,
};
