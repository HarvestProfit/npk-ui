declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@harvest-profit/npk/icons/regular' {
  export const CheckedIcon: React.ComponentType;
  
}