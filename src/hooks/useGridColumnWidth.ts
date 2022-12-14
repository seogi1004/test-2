import { useCallback, useEffect, useMemo } from 'react';
import { ColumnWidthStatus, useGridContext } from '../contexts/Grid';

interface ColumnWidthProperties {
  columnCount: number;
}

export const useGridColumnWidth = ({ columnCount }: ColumnWidthProperties) => {
  const { columnWidthStatusList, setColumnWidthStatusList } = useGridContext();

  useEffect(() => {
    if (columnCount < columnWidthStatusList.length) {
      setColumnWidthStatusList(columnWidthStatusList.slice(columnCount));
    } else if (columnCount > columnWidthStatusList.length) {
      const additionalCount: number = columnCount - columnWidthStatusList.length;
      const additionalWidthList: ColumnWidthStatus[] = new Array(additionalCount).fill(0);
      setColumnWidthStatusList([...columnWidthStatusList, ...additionalWidthList]);
    }
  }, [columnCount, columnWidthStatusList, setColumnWidthStatusList]);

  const setColumnWidthStatus = useCallback(
    (index: number, width: number, isChanged: boolean) => {
      if (index < columnCount) {
        setColumnWidthStatusList((previousValue: ColumnWidthStatus[]) => {
          if (index < previousValue.length) {
            previousValue[index] = { width, isChanged };
          }
          return [...previousValue];
        });
      }
    },
    [columnCount, setColumnWidthStatusList],
  );

  const setColumnWidth = useCallback(
    (index: number, width: number) => {
      setColumnWidthStatus(index, width, false);
    },
    [setColumnWidthStatus],
  );

  const updateColumnWidth = useCallback(
    (index: number, width: number) => {
      setColumnWidthStatus(index, width, true);
    },
    [setColumnWidthStatus],
  );

  const isColumnWidthChanged = useCallback(
    (index: number) => {
      if (index < columnCount && index < columnWidthStatusList.length) {
        return columnWidthStatusList[index].isChanged;
      }
    },
    [columnCount, columnWidthStatusList],
  );

  const columnWidthList = useMemo(() => columnWidthStatusList.map(({ width }) => width), [columnWidthStatusList]);

  return {
    columnWidthList,
    columnWidthStatusList,
    setColumnWidth,
    updateColumnWidth,
    isColumnWidthChanged,
  };
};
