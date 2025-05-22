export function nextFocusableElement({ reverse = false, activeElem = null, parent = null, parentElem = null, repeat = false, requireParentMatch = true } = {}) {
  // check if an element is defined or use activeElement 
  activeElem = activeElem instanceof HTMLElement ? activeElem : document.activeElement;

  if (parent) parentElem = activeElem.closest(parent);
  if (!requireParentMatch) {
    parentElem ||= document;
  }

  if (!parentElem) return null;

  const queryString = [
    'a:not([disabled]):not([tabindex="-1"])',
    'button:not([disabled]):not([tabindex="-1"])',
    'input:not([disabled]):not([tabindex="-1"])',
    'select:not([disabled]):not([tabindex="-1"])',
    '[tabindex]:not([disabled]):not([tabindex="-1"])'
  ].join(',');

  // focusable+visible elements and the current active element
  const queryResult = Array.prototype.filter.call(parentElem.querySelectorAll(queryString), elem => elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem === activeElem);

  if (reverse) {
    const lastElement = repeat ? queryResult[queryResult.length - 1] : null;
    
    // previous element or last element
    return queryResult[queryResult.indexOf(activeElem) - 1] || lastElement
  }

  const firstElement = repeat ? queryResult[0] : null;
  // next element or first element
  return queryResult[queryResult.indexOf(activeElem) + 1] || firstElement;
}

export function formatNumber(value) {
  const numberValue = parseFloat(value.replace(/,/g, ''));

  const parts = numberValue.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
}