import { AriaRole, useMemo, useRef, useState } from 'react';
import { autoUpdate, flip, offset, shift } from '@floating-ui/dom';
import { arrow, useClick, useDismiss, useFloating, useInteractions, useMergeRefs, useRole } from '@floating-ui/react';
import { MenuContextType } from './MenuContext';

interface UsePopoverProps {
  initialOpen?: boolean;
  placement?: any;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showArrow?: boolean | null;
  initialFocus?: number;
  autoDismiss?: boolean | 'menu';
  submenu?: boolean;
  variant?: string;
  offset?: number;
  role?: 'dialog' | 'menu' | 'listbox';
}

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
  offset: offsetAmount = 5,
  role = 'dialog',
}: UsePopoverProps): MenuContextType {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();
  const arrowRef = useRef<HTMLElement>(null);

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
  const ariarole = useRole(data.context, { role: role || 'dialog' });
  const interactions = useInteractions([click, dismiss, ariarole]);

  return useMemo<MenuContextType>(
    () => ({
      menu: true,
      open,
      setOpen,
      initialFocus,
      role,
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
    [open, setOpen, interactions, data, modal, labelId, descriptionId, arrowRef, showArrow, autoDismiss, submenu, placement, variant, role, initialFocus]
  );
}

export default usePopover;
