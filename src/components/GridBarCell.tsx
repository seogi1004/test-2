import { css } from '@emotion/css';
import classNames from 'classnames';
import { FunctionComponent, useMemo } from 'react';

interface GridBarCellProperties {
  value: number;
  totalValue: number;
  color: 'green' | 'blue' | 'yellow' | 'purple';
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
    width: '100%',
    height: '6px',
    background: 'rgba(0, 0, 0, 0.047)',
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
    zIndex: -1,
  }),
};

export const GridBarCell: FunctionComponent<GridBarCellProperties> = ({ value, totalValue, color }) => {
  const percentage: number = useMemo(() => (value / totalValue) * 100, [totalValue, value]);

  const barLengthStyle = useMemo(() => ({ width: `${percentage}%` }), [percentage]);
  const barColorStyle = useMemo(() => {
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
  }, [color]);
  const backgroundBarColorStyle = useMemo(() => {
    switch (color) {
      case 'green':
        return css({ backgroundColor: '#E7FAEF' });
      case 'blue':
        return css({ backgroundColor: '#ECF1FF' });
      case 'yellow':
        return css({ backgroundColor: '#FFF3E2' });
      case 'purple':
        return css({ backgroundColor: '#FEF0FF' });
    }
  }, [color]);

  return (
    <div className={styles.container}>
      <div className={classNames([styles.backgroundBar, backgroundBarColorStyle])} style={barLengthStyle}></div>
      <div className={styles.textContainer}>
        <div className={styles.value}>{value}</div>
        <div className={styles.percentage}>{Math.round(percentage)}%</div>
      </div>
      <div className={styles.barContainer}>
        <div className={classNames([styles.bar, barColorStyle])} style={barLengthStyle}></div>
      </div>
    </div>
  );
};
