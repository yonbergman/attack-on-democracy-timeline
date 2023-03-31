const { findIcon } = require('../lib/icons');
const { fetchAllEntries, imageUrl, ogImageUrl } = require('../lib/sanity');

const header = 'מאבק על הדמוקרטיה - ציר זמן';

// Page details
const pageTitle = 'מאבק על הדמוקרטיה - ציר זמן';
const pageDescription = 'ציר זמן של כל האירועים המשמעותיים במאבק על הדמוקרטיה';
const pageAuthor = 'עידו עברי ויונתן ברגמן';

// DON'T EDIT BELOW THIS LINE! --------------------------------------------------------------------
const getFilters = (entries) => {
  const filters = new Set();
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      for (var j = 0; j < entry.categories.length; j++) {
        filters.add(entry.categories[j]);
      }
    }
  }
  var filtersArray = [...filters];
  filtersArray.sort();
  return filtersArray;
};

const enrich = async (entries) => {
  // reverse for chronological order
  entries.reverse();
  let max = 0;
  for (const entry of entries) {
    if (!entry.protesterAmount) {
      entry.protesterAmount = max;
    } else {
      max = Math.max(max, entry.protesterAmount);
    }
  }
  entries.reverse();

  for (const entry of entries) {
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      entry.categoriesString = entry.categories.join(',');
    }
    if (Object.prototype.hasOwnProperty.call(entry, 'icon')) {
      entry.iconDescription = findIcon(entry.icon)?.title;
    }
    entry.imageUrl =
      entry.image &&
      entry.image.asset &&
      entry.image.asset._ref &&
      (await imageUrl(entry.image, 400));
    entry.ogImageUrl =
      (entry.image &&
        entry.image.asset &&
        entry.image.asset._ref &&
        (await ogImageUrl(entry.image))) ||
      'https://fightfordemocracystory.co.il/img/og-image.png';
  }
  return entries;
};

module.exports = async function () {
  const entries = await fetchAllEntries();
  return {
    header,
    entries: await enrich(entries),
    filters: getFilters(entries),
    head: {
      title: pageTitle,
      description: pageDescription,
      author: pageAuthor,
    },
  };
};
