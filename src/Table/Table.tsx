import React from "react";
import classes from './Table.module.css';
import Placeholder from "../Placeholder";

interface TableProps {
  [key: string]: any; // Allow other props
  layout?: 'auto' | 'fixed';
  truncate?: boolean;
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
}

interface TDProps {
  [key: string]: any; // Allow other props
  truncate?: boolean;
  type?: 'number';
}

interface LoadingProps {
  [key: string]: any; // Allow other props
  rows?: number;
  columns?: number;
}

type TableType = React.FC<TableProps> & {
  Td: React.FC<TDProps>;
  Loading: React.FC<LoadingProps>;
}

const Table: TableType = ({ children, layout = 'auto', truncate = false, height = null, minHeight = null, maxHeight = null, className = '', ...props }) => {
  return (
    <div data-component="table" style={{ height, minHeight, maxHeight, overflow: 'auto' }}>
      <table data-layout={layout} data-truncate={truncate} className={`${classes.Table} ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

Table.Td = ({ children, type = null, truncate = false, ...props }) => (
  <td data-type={type} data-truncate={truncate} {...props}>
    {children}
  </td>
)

Table.Loading = ({ rows = 4, columns = 5, ...props }) => (
  <Table {...props}>
    <thead>
      <tr>
        {Array.from({ length: columns }, (_, i) => <th key={i}><Placeholder /></th>)}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: rows }, (_, i) => (
        <tr key={i}>
          {Array.from({ length: columns }, (_, j) => (
            <td key={j}><Placeholder /></td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default Table;
export type { TableType, TableProps, TDProps, LoadingProps };