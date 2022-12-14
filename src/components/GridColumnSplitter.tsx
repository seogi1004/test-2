import { css } from '@emotion/css';
import { FunctionComponent } from 'react';

interface GridColumnSplitterProperties {
  index: number;
}

const styles = {
  container: css({
    position: 'relative',
    minWidth: '1px',
    maxWidth: '1px',
    backgroundColor: '#DADADA',
  }),
  inset: css({
    position: 'absolute',
    left: '-4px',
    top: '0px',
    minWidth: '9px',
    maxWidth: '9px',
    height: '100%',
    cursor: 'col-resize',
  }),
};

export const GridColumnSplitter: FunctionComponent<GridColumnSplitterProperties> = ({ index }) => {
  return (
    <div className={styles.container} draggable data-column-index={index}>
      <div className={styles.inset}></div>
    </div>
  );
};
