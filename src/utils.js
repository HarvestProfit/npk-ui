export function nextFocusableElement({ reverse = false, activeElem = null }) {
  // check if an element is defined or use activeElement 
  activeElem = activeElem instanceof HTMLElement ? activeElem : document.activeElement;

  const queryString = [
    'a:not([disabled]):not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([disabled]):not([tabindex="-1"])'
  ].join(',');

  // focusable+visible elements and the current active element
  const queryResult = Array.prototype.filter.call(document.querySelectorAll(queryString), elem => elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem === activeElem);

  if (reverse) {
    // previous element or last element
    return queryResult[queryResult.indexOf(activeElem) - 1] || queryResult[queryResult.length - 1]
  }

  // next element or first element
  return (queryResult[queryResult.indexOf(activeElem) + 1] || queryResult[0]);
}

export function formatNumber(value) {
  const numberValue = parseFloat(value.replace(/,/g, ''));

  const parts = numberValue.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}