import { css } from '@emotion/css';
import { CSSProperties, FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ArrowDown from '../assets/icons/arrow-down.svg';
import ArrowEmpty from '../assets/icons/arrow-empty.svg';
import ArrowUp from '../assets/icons/arrow-up.svg';
import { useGridContext } from '../contexts/Grid';
import { useGridColumnWidth } from '../hooks/useGridColumnWidth';

interface GridHeaderColumnProperties {
  column: Column;
}

const styles = {
  container: css({
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    boxSizing: 'border-box',
    color: '#616161',
    fontSize: '12px',
    cursor: 'pointer',
  }),
};

export const GridHeaderColumn: FunctionComponent<GridHeaderColumnProperties> = ({ column }) => {
  const { columns, sortColumn, setSortColumn, sortOrder, setSortOrder } = useGridContext();

  const { columnWidthList, setColumnWidth, isColumnWidthChanged } = useGridColumnWidth({ columnCount: columns.length });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const index: number = columns.indexOf(column);
      const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const entry of entries) {
          const { width } = entry.target.getBoundingClientRect();
          if (width !== columnWidthList[index]) {
            setColumnWidth(index, width);
          }
        }
      });
      resizeObserver.observe(ref.current);
      return () => resizeObserver.disconnect();
    }
  }, [column, columnWidthList, columns, setColumnWidth]);

  const [widthStyle, setWidthStyle] = useState<CSSProperties>();

  useEffect(() => {
    const index: number = columns.indexOf(column);
    if (index >= 0 && isColumnWidthChanged(index)) {
      setWidthStyle({
        minWidth: `${columnWidthList[index]}px`,
        maxWidth: `${columnWidthList[index]}px`,
      });
    }
  }, [column, columnWidthList, columns, isColumnWidthChanged]);

  const onClick = useCallback(() => {
    if (sortColumn === column) {
      setSortOrder((previousValue) => -(((-previousValue + 2) % 3) - 1));
    } else {
      setSortColumn(column);
      setSortOrder(-1);
    }
  }, [column, setSortColumn, setSortOrder, sortColumn]);

  const arrowIcon = useMemo(() => {
    if (sortColumn === column) {
      if (sortOrder < 0) {
        return ArrowUp;
      } else if (sortOrder > 0) {
        return ArrowDown;
      }
    }
    return ArrowEmpty;
  }, [column, sortColumn, sortOrder]);

  return (
    <div ref={ref} className={styles.container} style={widthStyle} onClick={onClick}>
      {column}
      <img src={arrowIcon} />
    </div>
  );
};
