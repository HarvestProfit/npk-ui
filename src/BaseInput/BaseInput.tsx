import React, { ReactNode, ComponentType, Ref, HTMLAttributes, useContext, useId } from 'react';
import classes from './BaseInput.module.css';
import Placeholder from '../Placeholder';
import { nextFocusableElement } from '../utils';

const BaseInputContext = React.createContext<BaseInputContextType>({});

export const useBaseInput = (props) => {
  const inheritedContext = useContext(BaseInputContext);
  return {
    disabled: props.disabled || inheritedContext.disabled || props.loading || inheritedContext.loading,
    'aria-label': props['aria-label'] || inheritedContext['aria-label'],
    'aria-labelledby': props['aria-labelledby'] || inheritedContext['aria-labelledby'],
    id: props.id,
    autoFocus: props.autoFocus,
    placeholder: props.placeholder,
    'aria-invalid': props['aria-invalid'],
    'aria-required': props['aria-required'],
    'aria-describedby': props['aria-describedby'],
    'aria-controls': props['aria-controls'],
    'aria-activedescendant': props['aria-activedescendant'],
    'aria-autocomplete': props['aria-autocomplete'],
    'autoComplete': props['autoComplete'],
    'autoCorrect': props['autoCorrect'],
    'autoCapitalize': props['autoCapitalize'],
    form: props.form,
    rows: props.rows,
    type: props.type || 'text',
  }
};

const isPlainContents = (element: any): boolean => {
  return typeof element === 'string' || typeof element === 'number';
};

const isValidElement = (element: any): boolean => {
  return typeof element === 'string' || React.isValidElement(element);
};

const preventFocusOnMouseDown = (event) => {
  const targetNode = event.target as Node;
  if (targetNode.parentNode && targetNode.parentNode.contains(document.activeElement)) {
    event.preventDefault()
  }
}


const BaseInput: React.FC<BaseInputProps> = ({
  className = '',
  variant,
  as: Tag = 'span',
  disabled,
  label,
  labelDescription,
  info,
  error,
  size,
  align,
  block,
  leadingVisual: LeadingVisual,
  trailingVisual: TrailingVisual,
  children,
  contentsProps = {},
  contentsRef = () => null,
  containsSegments,
  onClick,
  onMouseDown,
  style,
  width,
  loading = false,
  ...props
}) => {
  const inheritedContext = useContext(BaseInputContext);
  variant = variant || inheritedContext.variant;
  size = size || inheritedContext.size;
  align = align || inheritedContext.align;
  disabled = disabled || inheritedContext.disabled;
  props['aria-label'] = props['aria-label'] || inheritedContext['aria-label'];
  props['aria-labelledby'] = props['aria-labelledby'] || inheritedContext['aria-labelledby'];

  const widthStyles = width ? { width } : {};


  let renderResult = null;
  if (loading) {
    const style = { height: null };
    if (props.type === 'textarea' && props.rows) {
      style.height = `${props.rows * 24}px`;
    }
    renderResult = <Placeholder className={classes.BaseInputPlaceholder} width={width || (block ? 'auto' : 210)} data-size={size} style={style} />
  } else {
    const tagProps = {};
    if (props['data-component']) tagProps['data-component'] = props['data-component']

    renderResult = (
      <Tag
        className={`${classes.BaseInput} ${containsSegments ? classes.SegmentedInput : ''} ${label ? '' : className}`}
        data-variant={variant}
        data-size={size}
        data-align={align}
        data-block={block}
        aria-disabled={disabled}
        onClick={onClick}
        onMouseDown={onMouseDown}
        style={{...widthStyles, ...style}}
        data-textarea={props.type === 'textarea' ? 'true' : undefined}
        {...tagProps}
      >
        {LeadingVisual && (
          <span
            data-component="leadingVisual"
            onMouseDown={preventFocusOnMouseDown}
            data-visual={isPlainContents(LeadingVisual) ? 'text' : 'visual'}
          >
            {isValidElement(LeadingVisual) ? LeadingVisual : <LeadingVisual />}
          </span>
        )}
        <div {...contentsProps} ref={contentsRef} data-component="contents">
          <BaseInputContext.Provider
            value={{
              disabled,
              loading,
              variant: 'plain',
              size,
              align,
              'aria-label': props['aria-label'],
              'aria-labelledby': props['aria-labelledby'],
            }}
          >
            {children}
          </BaseInputContext.Provider>
        </div>
        {TrailingVisual && (
          <span
            data-component="trailingVisual"
            onMouseDown={preventFocusOnMouseDown}
            data-visual={isPlainContents(TrailingVisual) ? 'text' : 'visual'}
          >
            {isValidElement(TrailingVisual) ? TrailingVisual : <TrailingVisual />}
          </span>
        )}
      </Tag>
    )
  }

  if (label) {
    return (
      <label className={`${classes.Label} ${className}`} onClick={(e) => {
        if (e.currentTarget.contains(document.activeElement)) {
          e.preventDefault();
          return;
        }

        const nextElem = nextFocusableElement({ parentElem: e.currentTarget });
        nextElem?.focus();
        e.preventDefault();
      }}>
        <span data-component="label-contents">{label}</span>
        {labelDescription && <span data-component="label-description">{labelDescription}</span>}
        {renderResult}
        {(info || error) && (
          <span data-component="label-info" data-error={!!error}>
            {error || info}
          </span>
        )}
      </label>
    )
  }

  return renderResult;
};

export default BaseInput;

interface BaseInputContextType {
  variant?: 'default' | 'invisible' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

export interface BaseInputProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  variant?: 'default' | 'invisible' | 'plain';
  as?: keyof JSX.IntrinsicElements | ComponentType<any>;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  leadingVisual?: ReactNode | any;
  trailingVisual?: ReactNode | any;
  children?: ReactNode;
  contentsProps?: HTMLAttributes<HTMLDivElement>;
  contentsRef?: Ref<HTMLDivElement>;
  containsSegments?: boolean;
  loading?: boolean;
  block?: boolean;
  label?: string | ReactNode;
  labelDescription?: string | ReactNode;
  info?: string | ReactNode;
  error?: string | ReactNode;
  type?: string; // Allow type to be specified, e.g., 'text', 'number', etc.
  width?: string | number; // Allow width to be a string or number
  [key: string]: any; // Allow other props
}