const moment = require('moment');

const sentenceCase = function (str) {
  if (typeof str !== 'string' || !str.length) {
    return str;
  }
  str = str.replace(/-/g, ' ');
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

const months = [
  'בינואר',
  'בפבואר',
  'במרץ',
  'באפריל',
  'במאי',
  'ביוני',
  'ביולי',
  'באוגוסט',
  'בספטמבר',
  'באוקטובר',
  'בנובמבר',
  'בדצמבר',
];

const humanizeDate = function (datetime, date) {
  const m = moment(datetime || date);
  const format = `D ${months[m.month()]}, YYYY${
    m.hour() === 0 && m.minute() === 0 ? '' : ' • HH:mm'
  }`;
  return m.format(format);
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
