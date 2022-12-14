import { css } from '@emotion/css';
import { Fragment, FunctionComponent, useEffect } from 'react';
import { useGridContext } from '../contexts/Grid';
import { GridColumnSplitter } from './GridColumnSplitter';
import { GridHeaderColumn } from './GridHeaderColumn';

interface GridHeaderProperties {
  columns: Column[];
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    padding: '0px 10px',
    backgroundColor: 'white',
    borderTop: '1px solid #DADADA',
    borderBottom: '1px solid #DADADA',
  }),
  columnSplitter: css({
    backgroundColor: '#E8E8E8',
  }),
};

export const GridHeader: FunctionComponent<GridHeaderProperties> = ({ columns }) => {
  const { setColumns, setColumnWidthStatusList } = useGridContext();

  useEffect(() => {
    setColumns(columns);
    setColumnWidthStatusList(new Array(columns.length).fill({}));
  }, [columns, setColumnWidthStatusList, setColumns]);

  return (
    <div className={styles.container}>
      {columns.map((column: Column, index: number) => (
        <Fragment key={index}>
          {index > 0 && <GridColumnSplitter index={index - 1} />}
          <GridHeaderColumn column={column} />
        </Fragment>
      ))}
    </div>
  );
};
