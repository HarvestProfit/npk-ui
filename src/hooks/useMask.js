const SPECIAL_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Tab', 'Escape', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock', 'Insert', 'Home', 'End', 'PageUp', 'PageDown'];

function keyMatchesMask(key, match) {
  if (typeof match === 'string') {
    return key === match;
  }
  if (match instanceof RegExp) {
    return match.test(key);
  }
  return false;
}

export function rule(match, ruleCB) {
  return [match, ruleCB];
}

export default (props) => {
  const { onKeyDown, mask } = props || {};
  const rules = mask.mask || [];

  const handleOnKeyDown = (event) => {  
    if (SPECIAL_KEYS.includes(event.key)) return;
  
    const previousValue = event.target.value || '';
    const selectionStart = event.target.selectionStart || 0;
    const selectionEnd = event.target.selectionEnd || 0;
    const nextValue = previousValue.slice(0, selectionStart) + event.key + previousValue.slice(selectionEnd);

    let validInput = false;
    for (let index = 0; index < rules.length; index++) {
      const [ match, rule ] = rules[index];

      if (keyMatchesMask(event.key, match)) {
        if (!rule) {
          validInput = true;
          break;
        }

        if (rule({ key: event.key, previousValue, nextValue, cursorIndex: selectionStart })) {
          validInput = true;
          break;
        }
      }
    }

    if (!validInput) {
      event.preventDefault();
      return;
    }

    if (onKeyDown) onKeyDown(event);
  }

  return {
    onKeyDown: handleOnKeyDown,
    formatter: mask.formatter || ((value) => value),
  };
}