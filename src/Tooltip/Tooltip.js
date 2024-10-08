import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from '../ThemeContext';
import classes from './Tooltip.module.css';
import { computePosition, flip, inline, offset, shift } from '@floating-ui/dom';

const ANIMATION_TIMING = 500;

const Tooltip = ({
  id,
  targetRef,
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
    clearTimeout(animationTimeout.current);
    setIsMounted(true);
    animationTimeout.current = setTimeout(() => setIsOpen(true), ANIMATION_TIMING);
  }, []);

  const closeTooltip = useCallback(() => {
    clearTimeout(animationTimeout.current);
    setIsOpen(false);
    animationTimeout.current = setTimeout(() => setIsMounted(false), ANIMATION_TIMING);
  }, []);

  useEffect(() => {
    if (targetRef?.current) {
      elementRef.current = targetRef.current;
    } else if (id) {
      elementRef.current = document.querySelector(`[aria-describedby="${id}"]`);
    }

    elementRef.current?.addEventListener("mouseenter", openTooltip);
    elementRef.current?.addEventListener("mouseleave", closeTooltip);

    return () => {
      elementRef.current?.removeEventListener("mouseenter", openTooltip);
      elementRef.current?.removeEventListener("mouseleave", closeTooltip);
    }
  }, []);

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
    document.getElementById(theme.prependRootId),
  );
}

export default Tooltip;
