import { useMemo, useRef, useState } from 'react';
import { autoUpdate, flip, offset, shift } from '@floating-ui/dom';
import { arrow, useClick, useDismiss, useFloating, useInteractions, useMergeRefs, useRole } from '@floating-ui/react';

function usePopover({
  initialOpen = false,
  placement = "bottom-start",
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  showArrow,
  initialFocus,
  autoDismiss = true,
  submenu = false,
  variant = 'dialog',
  offset: offsetAmount = 5
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState();
  const [descriptionId, setDescriptionId] = useState();
  const arrowRef = useRef();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetAmount),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "end",
      }),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef,
      }),
    ]
  });

  const click = useClick(data.context, { enabled: controlledOpen == null });
  const dismiss = useDismiss(data.context);
  const role = useRole(data.context);
  const interactions = useInteractions([click, dismiss, role]);

  return useMemo(
    () => ({
      menu: true,
      open,
      setOpen,
      initialFocus,
      ...interactions,
      ...data,
      modal,
      submenu,
      arrowRef,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
      showArrow,
      autoDismiss,
      useMergeRefs,
      placement,
      variant
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId, arrowRef, showArrow, autoDismiss, submenu, placement, variant, initialFocus]
  );
}

export default usePopover;