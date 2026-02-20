const SPECIAL_KEYS = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Tab', 'Escape', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'NumLock', 'ScrollLock', 'Insert', 'Home', 'End', 'PageUp', 'PageDown'];
import { nextFocusableElement } from '../utils';

function keyMatchesMask(key: string, match: string | RegExp) {
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

export default (props: UseMaskProps) => {
  const { onKeyDown, mask, valueRef, navigateWithArrows } = props || {};
  const rules = mask?.mask || [];

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const previousValue = valueRef?.current || event.currentTarget.value || '';
    if (mask?.shiftFocusIf && previousValue === '' && event.key === 'Backspace') {
      setTimeout(() => {
        nextFocusableElement({ activeElem: event.currentTarget, reverse: true, parent: '[data-component=input-group]' })?.focus();
      }, 10);
      if (onKeyDown) onKeyDown(event, true);
      return;
    }

    if ((navigateWithArrows && event.key === 'ArrowLeft')) {
      setTimeout(() => {
        nextFocusableElement({ activeElem: event.currentTarget, reverse: true, parent: '[data-component=input-group]', requireParentMatch: event.key === 'ArrowLeft' })?.focus();
      }, 10);
      if (onKeyDown) onKeyDown(event, true);
      return
    }

    if ((navigateWithArrows && event.key === 'ArrowRight')) {
      setTimeout(() => {
        nextFocusableElement({ activeElem: event.currentTarget, parent: '[data-component=input-group]', requireParentMatch: event.key === 'ArrowRight' })?.focus();
      }, 10);
      if (onKeyDown) onKeyDown(event, true);
      return
    }

    if (SPECIAL_KEYS.includes(event.key)) {
      if (onKeyDown) onKeyDown(event, true);
      return;
    }

    const selectionStart = isFinite(event.currentTarget.selectionStart) ? event.currentTarget.selectionStart : previousValue.length + 1;
    const selectionEnd = isFinite(event.currentTarget.selectionEnd) ? event.currentTarget.selectionEnd : previousValue.length + 1;
    const nextValue = previousValue.slice(0, selectionStart) + event.key + previousValue.slice(selectionEnd);

    let validInput = false;
    for (let index = 0; index < rules.length; index++) {
      const [ match, rule ] = rules[index];

      if (keyMatchesMask(event.key, match)) {
        if (!rule) {
          validInput = true;
          break;
        }

        if (rule({ key: event.key, previousValue, nextValue, cursorIndex: selectionStart, target: event.currentTarget })) {
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

    if (onKeyDown) onKeyDown(event, false);
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

interface UseMaskProps {
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>, isSpecialKey: boolean) => any;
  mask?: MaskReturnType;
  valueRef?: React.RefObject<string>;
  navigateWithArrows?: boolean;
}

export type { MaskType, MaskReturnType, RuleType };
