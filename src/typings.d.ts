declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@harvest-profit/npk/icons/regular' {
  export const CheckedIcon: React.ComponentType;
  export const CalendarIcon: React.ComponentType;
  export const BackwardIndicatorIcon: React.ComponentType;
  export const ForwardIndicatorIcon: React.ComponentType;
}