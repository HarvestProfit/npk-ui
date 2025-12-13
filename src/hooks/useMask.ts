const SPECIAL_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Tab', 'Escape', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock', 'Insert', 'Home', 'End', 'PageUp', 'PageDown'];
import { nextFocusableElement } from '../utils';

function keyMatchesMask(key, match) {
  if (typeof match === 'string') {
    return key === match;
  }
  if (match instanceof RegExp) {
    return match.test(key);
  }
  return false;
}

export const rule: RuleFunction = (match, ruleCB) => {
  return [match, ruleCB];
};

export default (props) => {
  const { onKeyDown, mask, valueRef, navigateWithArrows } = props || {};
  const rules = mask?.mask || [];

  const handleOnKeyDown = (event) => {
    const previousValue = valueRef?.current || event.target.value || '';
    if (mask?.shiftFocusIf && previousValue === '' && event.key === 'Backspace') {
      setTimeout(() => {
        nextFocusableElement({ activeElem: event.target, reverse: true, parent: '[data-component=input-group]' })?.focus();
      }, 10);
      if (onKeyDown) onKeyDown(event, true);
      return;
    }

    if ((navigateWithArrows && event.key === 'ArrowLeft') || event.key === 'Tab' && event.shiftKey) {
      setTimeout(() => {
        nextFocusableElement({ activeElem: event.target, reverse: true, parent: '[data-component=input-group]', requireParentMatch: event.key === 'ArrowLeft' })?.focus();
      }, 10);
      if (onKeyDown) onKeyDown(event, true);
      return
    }

    if ((navigateWithArrows && event.key === 'ArrowRight') || event.key === 'Tab') {
      setTimeout(() => {
        nextFocusableElement({ activeElem: event.target, parent: '[data-component=input-group]', requireParentMatch: event.key === 'ArrowRight' })?.focus();
      }, 10);
      if (onKeyDown) onKeyDown(event, true);
      return
    }

    if (SPECIAL_KEYS.includes(event.key)) {
      if (onKeyDown) onKeyDown(event, true);
      return;
    }
  
    const selectionStart = isFinite(event.target.selectionStart) ? event.target.selectionStart : previousValue.length + 1;
    const selectionEnd = isFinite(event.target.selectionEnd) ? event.target.selectionEnd : previousValue.length + 1;
    const nextValue = previousValue.slice(0, selectionStart) + event.key + previousValue.slice(selectionEnd);

    let validInput = false;
    for (let index = 0; index < rules.length; index++) {
      const [ match, rule ] = rules[index];

      if (keyMatchesMask(event.key, match)) {
        if (!rule) {
          validInput = true;
          break;
        }

        if (rule({ key: event.key, previousValue, nextValue, cursorIndex: selectionStart, target: event.target })) {
          validInput = true;
          break;
        }
      }
    }

    if (mask?.shiftFocusIf && mask?.shiftFocusIf(nextValue, event.key)) {
      setTimeout(() => {
        nextFocusableElement({ activeElem: event.target, parent: '[data-component=input-group]' })?.focus();
      }, 10);
    }

    if (!validInput) {
      event.preventDefault();
      return;
    }

    if (onKeyDown) onKeyDown(event);
  }

  return {
    onKeyDown: mask ? handleOnKeyDown : onKeyDown,
    formatter: mask?.formatter || ((value) => value),
    aria: mask?.aria || {}
  };
}

type RuleType = [string | RegExp, ((params: { key: string; previousValue: string; nextValue: string; cursorIndex: number; target: EventTarget }) => boolean)?];

interface RuleFunction {
  (match: string | RegExp, ruleCB?: (params: { key: string; previousValue: string; nextValue: string; cursorIndex: number; target: EventTarget }) => boolean): RuleType;
}

interface MaskReturnType {
  mask: RuleType[];
  formatter?: (value: string) => string;
  autoComplete?: (value: string, key: string) => string;
  shiftFocusIf?: (nextValue: string, key: string) => boolean;
  aria?: any
}

type MaskType = (props?: any) => MaskReturnType;

export type { MaskType, MaskReturnType, RuleType };