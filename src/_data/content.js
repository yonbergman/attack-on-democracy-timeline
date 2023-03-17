const { fetchAllEntries, imageUrl } = require('../lib/sanity');

const header = 'ציר הזמן של הדמוקרטיה';
const footer = 'A footer goes here.';

// Page details
const pageTitle = 'Static timeline generator'; // The title of the page that shows in the browser tab
const pageDescription = 'A super fancy timeline'; // The description of the page for search engines
const pageAuthor = 'Jane Doe'; // Your name

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
  for (const entry of entries) {
    if (Object.prototype.hasOwnProperty.call(entry, 'categories')) {
      entry.categoriesString = entry.categories.join(',');
    }
    entry.imageUrl = entry.image && (await imageUrl(entry.image, 200));
  }
  return entries;
};

module.exports = async function () {
  const entries = await fetchAllEntries();
  return {
    header,
    footer,
    entries: await enrich(entries),
    filters: getFilters(entries),
    head: {
      title: pageTitle,
      description: pageDescription,
      author: pageAuthor,
    },
  };
};
