import { css } from '@emotion/css';
import classNames from 'classnames';
import { Fragment, FunctionComponent, useMemo } from 'react';
import { useGridContext } from '../contexts/Grid';
import { GridColumn } from './GridColumn';
import { GridColumnSplitter } from './GridColumnSplitter';

interface GridRowProperties {
  row: Row;
  height: number;
  isSelected?: boolean;
}

export const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    outline: '1px solid #DADADA',
    borderRadius: '3px',
    transition: '.2s',
    '&:hover': {
      outline: '2px solid #865EFF',
    },
    '&:active': {
      backgroundColor: 'rgba(0, 0, 0, .04)',
    },
  }),
  getHeightStyle: (height: number) =>
    css({
      minHeight: `${height}px`,
      maxHeight: `${height}px`,
    }),
  selectedContainer: css({
    outline: '2px solid #1C1C1C',
  }),
  columnSplitter: css({
    backgroundColor: '#E8E8E8',
  }),
};

export const GridRow: FunctionComponent<GridRowProperties> = ({ row, height, isSelected }) => {
  const { columns } = useGridContext();

  const heightStyle = useMemo(() => styles.getHeightStyle(height), [height]);

  return (
    <div className={classNames([styles.container, heightStyle, isSelected && styles.selectedContainer])}>
      {columns.map((column: Column, index: number) => (
        <Fragment key={index}>
          {index > 0 && <GridColumnSplitter index={index - 1} />}
          <GridColumn row={row} column={column} />
        </Fragment>
      ))}
    </div>
  );
};
