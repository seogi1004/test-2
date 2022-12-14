import { css } from '@emotion/css';
import classNames from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { useGridContext } from '../contexts/Grid';
import { useGridColumnWidth } from '../hooks/useGridColumnWidth';
import { GridBarCell } from './GridBarCell';
import { BarGroupProperties, GridBarGroupCell } from './GridBarGroupCell';
import { GridTextCell } from './GridTextCell';

interface GridColumnProperties {
  row: Row;
  column: Column;
}

const styles = {
  container: css({
    display: 'flex',
  }),
};

export const GridColumn: FunctionComponent<GridColumnProperties> = ({ row, column }) => {
  const { columns } = useGridContext();

  const { columnWidthList } = useGridColumnWidth({ columnCount: columns.length });

  const cellComponent = useMemo(() => {
    switch (column) {
      case '응답시간': {
        const values: BarGroupProperties[] = [
          { value: row['메서드 시간'], color: 'green' },
          { value: row['SQL 시간'], color: 'blue' },
          { value: row['External Call 시간'], color: 'yellow' },
          { value: row['Batch 시간'], color: 'purple' },
        ];
        return <GridBarGroupCell value={row[column]} values={values} />;
      }
      case '메서드 시간':
        return <GridBarCell value={row[column]} totalValue={row['응답시간']} color="green" />;
      case 'SQL 시간':
        return <GridBarCell value={row[column]} totalValue={row['응답시간']} color="blue" />;
      case 'External Call 시간':
        return <GridBarCell value={row[column]} totalValue={row['응답시간']} color="yellow" />;
      case 'Batch 시간':
        return <GridBarCell value={row[column]} totalValue={row['응답시간']} color="purple" />;
      default:
        return <GridTextCell text={`${row[column]}`} />;
    }
  }, [column, row]);

  const widthStyle = useMemo(() => {
    const index: number = columns.indexOf(column);
    const width: number = columnWidthList[index];
    if (width > 0) {
      return {
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
      };
    }
  }, [column, columnWidthList, columns]);

  return (
    <div className={classNames([styles.container])} style={widthStyle}>
      {cellComponent}
    </div>
  );
};
