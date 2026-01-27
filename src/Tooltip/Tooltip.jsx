import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from '../ThemeContext';
import classes from './Tooltip.module.css';
import { computePosition, flip, inline, offset, shift } from '@floating-ui/dom';

const HOVER_SHOW_TOOLTIP_AFTER = 800;// ms
const CLICK_SHOW_TOOLTIP_AFTER = 1000;// ms
const EVENT_OPEN = 'NPK:TooltipOpen';
const EVENT_CLOSE = 'NPK:TooltipClose';

const Tooltip = ({
  id = null,
  targetRef = null,
  as: Component = 'div',
  inline: inlineOption = false, // honestly I haven't seen this work yet
  children
}) => {
  const theme = useContext(ThemeContext);
  const elementRef = useRef();
  const tooltipRef = useRef();
  const animationTimeout = useRef();
  const tooltipStyleRef = useRef({});
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openTooltip = useCallback(() => {
    const event = new CustomEvent(EVENT_OPEN, { bubbles: true });
    elementRef.current.dispatchEvent(event);
    clearTimeout(animationTimeout.current);
    setIsMounted(true);
    animationTimeout.current = setTimeout(() => setIsOpen(true), HOVER_SHOW_TOOLTIP_AFTER);
  }, []);

  const closeTooltip = useCallback(() => {
    const event = new CustomEvent(EVENT_CLOSE, { bubbles: true });
    elementRef.current.dispatchEvent(event);
    clearTimeout(animationTimeout.current);
    setIsOpen(false);
    animationTimeout.current = setTimeout(() => setIsMounted(false), 100);
  }, []);

  const delayOpeningTooltip = useCallback(() => {
    clearTimeout(animationTimeout.current);
    animationTimeout.current = setTimeout(() => openTooltip(), CLICK_SHOW_TOOLTIP_AFTER);
  }, [openTooltip]);

  const skipOpeningTooltip = useCallback((event) => {
    if (event.target === elementRef.current) return;
    if (!elementRef.current.contains(event.target)) return;
    closeTooltip();
  }, [closeTooltip]);

  const potentiallyOpenTooltip = useCallback((event) => {
    if (event.target === elementRef.current) return;
    if (!elementRef.current.contains(event.target)) return;
    openTooltip();
  }, [openTooltip]);

  useEffect(() => {
    if (targetRef?.current) {
      elementRef.current = targetRef.current;
    } else if (id) {
      elementRef.current = document.querySelector(`[aria-describedby="${id}"]`);
    }

    elementRef.current?.addEventListener("mouseenter", openTooltip);
    elementRef.current?.addEventListener("mouseleave", closeTooltip);
    elementRef.current?.addEventListener("click", delayOpeningTooltip);
    elementRef.current?.addEventListener(EVENT_OPEN, skipOpeningTooltip);
    elementRef.current?.addEventListener(EVENT_CLOSE, potentiallyOpenTooltip);

    return () => {
      elementRef.current?.removeEventListener("mouseenter", openTooltip);
      elementRef.current?.removeEventListener("mouseleave", closeTooltip);
      elementRef.current?.removeEventListener("click", delayOpeningTooltip);
      elementRef.current?.removeEventListener(EVENT_OPEN, skipOpeningTooltip);
      elementRef.current?.removeEventListener(EVENT_CLOSE, potentiallyOpenTooltip);
    }
  }, [targetRef?.current, id, openTooltip, closeTooltip, delayOpeningTooltip, skipOpeningTooltip, potentiallyOpenTooltip]);

  const setTooltipRef = (ref) => {
    tooltipRef.current = ref;
    if (tooltipRef.current) {
      computePosition(
        elementRef.current,
        tooltipRef.current,
        {
          middleware: [
            inlineOption && inline(),
            offset(4),
            flip(),
            shift({ padding: 5 }),
          ]
        }
      ).then(({ x, y }) => {
        tooltipStyleRef.current = {
          left: x,
          top: y
        }
      });
    }
  }

  if (!isMounted) return null;

  return ReactDOM.createPortal(
    (
      <Component ref={setTooltipRef} className={classes.Tooltip} role="tooltip" data-visibility={isOpen} style={tooltipStyleRef.current}>
        {children}
      </Component>
    ),
    document.getElementById(theme.appendRootId),
  );
}

export default Tooltip;
