import React, { FC, ReactNode } from 'react';
import classes from './BlankSlate.module.css';
import Card from '../Card';

interface BlankSlateProps {
  children: ReactNode;
  variant?: 'normal' | 'border'; // Add other variants as needed
  title: String,
  className?: string;
  [key: string]: any; // Allow other props
}

interface BlankSlateChildrenProps {
  children: ReactNode;
}

const BlankSlate: FC<BlankSlateProps> & {
  Description: FC<BlankSlateChildrenProps>;
  Actions: FC<BlankSlateChildrenProps>;
  Visual: FC<BlankSlateChildrenProps>;
} = ({ title, children, variant = 'normal', className, ...props }) => (
  <div {...props} data-variant={variant} className={`${classes.BlankSlate} ${className || ''}`} data-component="blank-slate">
    <Card variant={variant === 'border' ? 'invisible' : 'normal'}>
      <div data-component="blank-slate-contents">
        <h2 className={classes.BlankSlateTitle}>{title}</h2>
        {children}
      </div>
    </Card>
  </div>
  );

BlankSlate.displayName = 'BlankSlate';

BlankSlate.Description = ({ children }) => (
  <p className={classes.BlankSlateDescription}>{children}</p>
);
BlankSlate.Description.displayName = 'BlankSlate.Description';

BlankSlate.Actions = ({ children }) => (
  <div className={classes.BlankSlateActions}>{children}</div>
);
BlankSlate.Actions.displayName = 'BlankSlate.Actions';

BlankSlate.Visual = ({ children }) => (
  <div className={classes.BlankSlateVisual}>{children}</div>
);
BlankSlate.Visual.displayName = 'BlankSlate.Visual';


export default BlankSlate;
export type { BlankSlateProps, BlankSlateChildrenProps };
