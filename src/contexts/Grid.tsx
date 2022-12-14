import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export interface ColumnWidthStatus {
  width: number;
  isChanged: boolean;
}

interface GridContextProperties {
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
  columnWidthStatusList: ColumnWidthStatus[];
  setColumnWidthStatusList: Dispatch<SetStateAction<ColumnWidthStatus[]>>;
  sortColumn?: Column;
  setSortColumn: Dispatch<SetStateAction<Column | undefined>>;
  sortOrder: number;
  setSortOrder: Dispatch<SetStateAction<number>>;
  maximumValue: number;
  setMaximumValue: Dispatch<SetStateAction<number>>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {};

const GridContext = createContext<GridContextProperties>({
  columns: [],
  setColumns: emptyFunction,
  columnWidthStatusList: [],
  setColumnWidthStatusList: emptyFunction,
  setSortColumn: emptyFunction,
  sortOrder: 0,
  setSortOrder: emptyFunction,
  maximumValue: 0,
  setMaximumValue: emptyFunction,
});

export const GridProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [columnWidthStatusList, setColumnWidthStatusList] = useState<ColumnWidthStatus[]>([]);
  const [sortColumn, setSortColumn] = useState<Column>();
  const [sortOrder, setSortOrder] = useState(0);
  const [maximumValue, setMaximumValue] = useState(0);

  const value = {
    columns,
    setColumns,
    sortColumn,
    setSortColumn,
    sortOrder,
    setSortOrder,
    columnWidthStatusList,
    setColumnWidthStatusList,
    maximumValue,
    setMaximumValue,
  };

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

export const useGridContext = () => useContext(GridContext);
