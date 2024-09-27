import * as React from 'react';

type Variant = 'default' | 'primary'

export interface ApplicationAlertProps {
  children: React.ReactNode,
  variant?: Variant,
  icon?: React.ElementType | null,
  as?: React.ComponentType<any> | keyof JSX.IntrinsicElements
}

declare class ApplicationAlert extends React.Component<ApplicationAlertProps> { }
export default ApplicationAlert;