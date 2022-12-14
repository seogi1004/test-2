import { css } from '@emotion/css';
import classNames from 'classnames';
import { CSSProperties, FunctionComponent, UIEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useGridContext } from '../contexts/Grid';
import { useGridViewport } from '../hooks/useGridViewport';
import { GridRow } from './GridRow';
import { GridRowSkeleton } from './GridRowSkeleton';

interface GridRowsProperties {
  rows: Row[];
  rowHeight?: number;
  rowGap?: number;
  paddingRowCount?: number;
  skeletonRowCount?: number;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
  }),
  calculatedContainer: css({
    height: '100%',
  }),
};

export const GridRows: FunctionComponent<GridRowsProperties> = ({
  rows,
  rowHeight: customRowHeight,
  rowGap: customRowGap,
  paddingRowCount,
  skeletonRowCount,
}) => {
  const { sortColumn, sortOrder, setMaximumValue } = useGridContext();

  const [containerHeight, setContainerHeight] = useState(0);

  const getContainerHeight = useCallback((element: HTMLDivElement) => {
    if (element) {
      const { height } = element.getBoundingClientRect();
      setContainerHeight(height);
    }
  }, []);

  const [isRowHeightCalculated, setRowHeightCalculated] = useState(!!customRowHeight);
  const [rowHeight, setRowHeight] = useState(customRowHeight ?? 0);

  const getRowHeight = useCallback(
    (element: HTMLDivElement) => {
      if (!isRowHeightCalculated && element) {
        if (customRowHeight) {
          setRowHeight(customRowHeight);
        } else {
          const { paddingTop, paddingBottom } = getComputedStyle(element);
          const { height } = element.getBoundingClientRect();
          setRowHeight(height - (parseFloat(paddingTop) + parseFloat(paddingBottom)));
        }
        setRowHeightCalculated(true);
      }
    },
    [customRowHeight, isRowHeightCalculated],
  );

  const [isRowGapCalculated, setRowGapCalculated] = useState(!!customRowGap);
  const [rowGap, setRowGap] = useState(customRowGap ?? 0);

  const getRowGap = useCallback(
    (element: HTMLDivElement) => {
      if (isRowHeightCalculated && !isRowGapCalculated && element) {
        if (customRowGap) {
          setRowGap(customRowGap);
        } else {
          const { paddingTop, paddingBottom } = getComputedStyle(element);
          const { height } = element.getBoundingClientRect();
          setRowGap(height - (parseFloat(paddingTop) + rowHeight * 2 + parseFloat(paddingBottom)));
        }
        setRowGapCalculated(true);
      }
    },
    [customRowGap, isRowGapCalculated, isRowHeightCalculated, rowHeight],
  );

  useEffect(() => {
    if (rowHeight !== customRowHeight) {
      setRowHeightCalculated(false);
    }
    if (rowGap !== customRowGap) {
      setRowGapCalculated(false);
    }
  }, [customRowGap, customRowHeight, rowGap, rowHeight]);

  const containerRefCallback = useCallback(
    (element: HTMLDivElement) => {
      getContainerHeight(element);
      getRowHeight(element);
      getRowGap(element);
    },
    [getContainerHeight, getRowGap, getRowHeight],
  );

  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = useCallback((event: UIEvent<HTMLDivElement, globalThis.UIEvent>) => {
    const { scrollTop } = event.currentTarget;
    setScrollTop(scrollTop);
  }, []);

  const {
    paddingRowStartIndex,
    paddingRowEndIndex,
    skeletonRowStartIndex,
    skeletonRowEndIndex,
    viewportHeight,
    viewportY,
  } = useGridViewport({
    viewHeight: containerHeight,
    rowHeight,
    rowGap,
    rowCount: rows.length,
    paddingRowCount,
    skeletonRowCount,
    scrollTop,
  });

  useEffect(() => {
    const maximumValue = Math.max(...rows.map((row: Row) => row['응답시간']));
    setMaximumValue(maximumValue);
  }, [rows, setMaximumValue]);

  const viewRows = useMemo(() => {
    if (sortColumn) {
      const sortedRows: Row[] = [...rows].sort((a: Row, b: Row) => {
        const valueA: Row[Column] = a[sortColumn];
        const valueB: Row[Column] = b[sortColumn];
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return -sortOrder * valueA.localeCompare(valueB);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return -sortOrder * (valueA - valueB);
        }
        return 0;
      });
      return sortedRows;
    }
    return rows;
  }, [rows, sortColumn, sortOrder]);

  const virtualContainerStyle = useMemo(() => {
    return css({
      display: 'flex',
      flexDirection: 'column',
      rowGap: `${rowGap}px`,
    });
  }, [rowGap]);
  const virtualContainerYStyle = useMemo<CSSProperties>(() => {
    return {
      minHeight: `${viewportHeight}px`,
      maxHeight: `${viewportHeight}px`,
      transform: `translateY(${viewportY}px)`,
    };
  }, [viewportHeight, viewportY]);

  return (
    <div
      ref={containerRefCallback}
      className={classNames([
        styles.container,
        isRowHeightCalculated && isRowGapCalculated && styles.calculatedContainer,
      ])}
      onScroll={onScroll}
    >
      {!isRowHeightCalculated ? (
        <GridRowSkeleton height={rowHeight} />
      ) : !isRowGapCalculated ? (
        <>
          <GridRowSkeleton height={rowHeight} />
          <GridRowSkeleton height={rowHeight} />
        </>
      ) : (
        <div className={virtualContainerStyle} style={virtualContainerYStyle}>
          {viewRows.map((row: Row, index: number) =>
            paddingRowStartIndex <= index && index < paddingRowEndIndex ? (
              <GridRow key={index} row={row} height={rowHeight} />
            ) : (
              skeletonRowStartIndex <= index &&
              index < skeletonRowEndIndex && <GridRowSkeleton key={index} height={rowHeight} />
            ),
          )}
        </div>
      )}
    </div>
  );
};
