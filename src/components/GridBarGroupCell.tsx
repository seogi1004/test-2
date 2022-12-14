import { css } from '@emotion/css';
import classNames from 'classnames';
import { FunctionComponent, useCallback, useMemo } from 'react';
import { useGridContext } from '../contexts/Grid';

export interface BarGroupProperties {
  value: number;
  color: 'green' | 'blue' | 'yellow' | 'purple';
}

interface GridBarGroupCellProperties {
  value: number;
  values: BarGroupProperties[];
}

const styles = {
  container: css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '8px',
    width: '100%',
  }),
  textContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  value: css({
    color: '#1C1C1C',
    fontSize: '12px',
    fontWeight: 'bold',
  }),
  percentage: css({
    color: '#1C1C1C',
    fontSize: '10px',
    fontWeight: 'normal',
  }),
  barContainer: css({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '16px',
    borderRadius: '3px',
    overflow: 'hidden',
  }),
  bar: css({
    height: '100%',
  }),
  backgroundBar: css({
    position: 'absolute',
    left: '0px',
    top: '0px',
    height: '100%',
    backgroundColor: '#F3EEFF',
    zIndex: -1,
  }),
};

export const GridBarGroupCell: FunctionComponent<GridBarGroupCellProperties> = ({ value, values }) => {
  const { maximumValue } = useGridContext();

  const percentage: number = useMemo(() => Math.floor((value / maximumValue) * 100), [maximumValue, value]);

  const getBarLengthStyle = useCallback(
    (subValue: number) => ({ width: `${Math.floor((subValue / value) * 100)}%` }),
    [value],
  );
  const getBarColorStyle = useCallback((color: BarGroupProperties['color']) => {
    switch (color) {
      case 'green':
        return css({ backgroundColor: '#49D484' });
      case 'blue':
        return css({ backgroundColor: '#719AFF' });
      case 'yellow':
        return css({ backgroundColor: '#FFAF38' });
      case 'purple':
        return css({ backgroundColor: '#CC69D2' });
    }
  }, []);
  const barLengthStyle = useMemo(() => ({ width: `${percentage}%` }), [percentage]);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundBar} style={barLengthStyle}></div>
      <div className={styles.textContainer}>
        <div className={styles.value}>{value}</div>
      </div>
      <div className={styles.barContainer}>
        {values.map(({ value, color }, index) => (
          <div
            key={index}
            className={classNames([styles.bar, getBarColorStyle(color)])}
            style={getBarLengthStyle(value)}
          ></div>
        ))}
      </div>
    </div>
  );
};
