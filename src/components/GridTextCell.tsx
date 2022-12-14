import { css } from '@emotion/css';
import classNames from 'classnames';
import { FunctionComponent, useMemo } from 'react';

interface GridTextCellProperties {
  text: string;
  align?: 'left' | 'center' | 'right';
}

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    boxSizing: 'border-box',
    color: '#616161',
    fontSize: '12px',
    wordBreak: 'break-all',
  }),
};

export const GridTextCell: FunctionComponent<GridTextCellProperties> = ({ text, align = 'left' }) => {
  const alignStyle = useMemo(() => {
    switch (align) {
      default:
      case 'left':
        return css({ justifyContent: 'flex-start' });
      case 'center':
        return css({ justifyContent: 'center' });
      case 'right':
        return css({ justifyContent: 'flex-end' });
    }
  }, [align]);

  return <div className={classNames([styles.container, alignStyle])}>{text}</div>;
};
