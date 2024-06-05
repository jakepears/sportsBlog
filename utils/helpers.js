module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let book = '📗';

    if (randomNum > 0.7) {
      book = '📘';
    } else if (randomNum > 0.4) {
      book = '📙';
    }

    return `<span for="img" aria-label="book">${book}</span>`;
  },
  formatDate: function (date) {
    if (date && typeof date.toLocaleDateString === 'function') {
      return date.toLocaleDateString();
    }
    return ''; // Return an empty string if the date is undefined or invalid
  },
};
