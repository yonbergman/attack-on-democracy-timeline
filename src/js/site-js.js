function show(el) {
  el.style.display = 'block';
  el.setAttribute('aria-hidden', false);
}

function hide(el) {
  el.style.display = 'none';
  el.setAttribute('aria-hidden', true);
}

function hideUnchecked() {
  /* Uncheck the "all" box if one of the filter boxes is unchecked */
  var allBoxes = document.querySelectorAll('input[type="checkbox"][name="filter"]');
  var checkedBoxes = document.querySelectorAll('input[type="checkbox"][name="filter"]:checked');
  if (checkedBoxes.length < allBoxes.length) {
    document.querySelector('input[type="checkbox"]#all').checked = false;
  } else {
    document.querySelector('input[type="checkbox"]#all').checked = true;
  }

  var activeFilters = [];
  checkedBoxes.forEach(function (filter) {
    activeFilters.push(filter.id);
  });

  var entries = document.getElementsByClassName('timeline-entry');
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var categories = [];
    try {
      categories = entry.dataset.category.split(',').filter((category) => category.length > 0);
    } catch {
      // Pass
    }
    if (categories.length && !isItemInCategories(categories, activeFilters)) {
      hide(entry);
    } else {
      show(entry);
    }
  }

  reflowEntries();
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function checkAll(ev) {
  const toValue = ev.target.checked;
  var checkboxes = document.querySelectorAll('input[type="checkbox"][name="filter"]');
  checkboxes.forEach(function (box) {
    box.checked = toValue;
  });
  var entries = document.getElementsByClassName('timeline-entry');
  for (var i = 0; i < entries.length; i++) {
    if (toValue) {
      show(entries[i]); 
    } else {
      hide(entries[i]);
    }
  }
  reflowEntries();
}

function isItemInCategories(categories, visibleCategories) {
  return categories.every((id) => visibleCategories.indexOf(id) >= 0)
}

function reflowEntries() {
  var entries = document.querySelectorAll('.timeline-entry[aria-hidden="false"]');
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    entry.classList.remove('odd', 'even', 'first');
    if (i === 0) {
      entry.classList.add('first');
    }
    if (i % 2 === 0) {
      entry.classList.add('even');
    } else {
      entry.classList.add('odd');
    }
  }
}

function onload() {
  /* We have JS! */
  var root = document.documentElement;
  root.classList.remove('no-js');

  /* Listen for filter changes */
  document.querySelectorAll('input[type="checkbox"][name="filter"]').forEach(function (box) {
    box.addEventListener('click', hideUnchecked);
  });
  document.querySelector('input[type="checkbox"]#all').addEventListener('click', checkAll);
  document.querySelector('#arrow').addEventListener('click', scrollToTop);

  /* Flow entries */
  reflowEntries();

  // Clean up
  document.removeEventListener('DOMContentLoaded', onload);

  // Write and intersection observer that looks for .timeline-entry and adds the class "in-view" when it's in view
  function startObserving() {
    const template = `<img src="/img/israel-flag.gif" width="20" height="20"/>`;

    function multiplyString(string, times) {
      return new Array(times + 1).join(string);
    }

    let currentAmount = 0;
    function updateAmount(amount) {
      currentAmount = amount;
      document.querySelector('#protester-amount').innerHTML = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      document.querySelector('#flags').innerHTML = multiplyString(template, Math.ceil(amount / 50000))
      
    }
    const entries = document.querySelectorAll('.timeline-entry');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      let max = 0;
      let found = 0;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          found += 1;
          // entry.target.classList.add('in-view');
          const amount = entry.target.getAttribute('data-protesterAmount');
          if (amount > max) {
            max = amount;
          }
          return;
        } else {
          // entry.target.classList.remove('in-view');
        }
      });
      if (found > 0) {
        updateAmount(max);

      }
    }, options);
    entries.forEach((entry) => {
      observer.observe(entry);
    });
  }
  startObserving();

  
  
  
  
}

if (document.readyState != 'loading') {
  onload();
} else {
  document.addEventListener('DOMContentLoaded', onload);
}
