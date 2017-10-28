/**
 * @param {string} content
 * @param {string} userID
 * @returns {string}
 */
function calculateReminder(content, userID, c) {
  if (content) {
    return c._('c.remind.time_up.with_note', {
      id: userID,
      content,
    });
  } else {
    return c._('c.remind.time_up.without_note', {
      id: userID,
    });
  }
}

module.exports = {
  calculateReminder,
};
