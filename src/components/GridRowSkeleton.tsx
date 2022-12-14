import { css, keyframes } from '@emotion/css';
import classNames from 'classnames';
import { FunctionComponent, useCallback, useMemo } from 'react';
import { styles as GridRowStyles } from './GridRow';

interface GridRowSkeletonProperties {
  height: number;
}

const animations = {
  skeleton: keyframes`
    0%, 20% { background-color: #EBEBEB; }
    50% { background-color: #DADADA; }
    80%, 100% { background-color: #EBEBEB; }
  `,
};

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    flexWrap: 'wrap',
    padding: '16px 12px',
    boxSizing: 'border-box',
  }),
  skeleton: css({
    height: '8px',
    backgroundColor: '#DADADA',
    borderRadius: '3px',
    animation: `${animations.skeleton} 2s ease infinite`,
  }),
};

export const GridRowSkeleton: FunctionComponent<GridRowSkeletonProperties> = ({ height }) => {
  const getWidthStyle = useCallback((width: number) => css({ width: `${width}%` }), []);

  const heightStyle = useMemo(() => GridRowStyles.getHeightStyle(height), [height]);

  return (
    <div className={classNames([GridRowStyles.container, heightStyle, styles.container])}>
      <div className={classNames([styles.skeleton, getWidthStyle(30)])}></div>
      <div className={classNames([styles.skeleton, getWidthStyle(50)])}></div>
      <div className={classNames([styles.skeleton, getWidthStyle(60)])}></div>
    </div>
  );
};
