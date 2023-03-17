const moment = require('moment');

const sentenceCase = function (str) {
  if (typeof str !== 'string' || !str.length) {
    return str;
  }
  str = str.replace(/-/g, ' ');
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const humanizeDate = function (datetime, date) {
  const m = moment(datetime || date);
  if (m.hour() === 0 && m.minute() === 0) {
    return m.format('DD/M/YY');
  }
  if (datetime) {
    return m.format('DD/M/YY HH:mm');
  }
  return m.format('LL');
};

const isWrappedInParagraphTags = function (html) {
  if (typeof html !== 'string') {
    return false;
  }
  return html.substring(0, 3) === '<p>';
};

module.exports = {
  sentenceCase,
  humanizeDate,
  isWrappedInParagraphTags,
};
