import { css } from '@emotion/css';
import { DragEvent, FunctionComponent, PropsWithChildren, useCallback, useRef, useState } from 'react';
import { useGridContext } from '../contexts/Grid';
import { useGridColumnWidth } from '../hooks/useGridColumnWidth';

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }),
  dragIcon: css({
    position: 'absolute',
    left: '-1px',
    top: '-1px',
  }),
};

export const Grid: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { columns } = useGridContext();

  const { columnWidthList, updateColumnWidth } = useGridColumnWidth({ columnCount: columns.length });

  const transparentImageRef = useRef<HTMLImageElement>(null);

  const [dragColumnWidth, setDragColumnWidth] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);

  const onDragStart = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      if (event.target instanceof HTMLDivElement && event.target.dataset['columnIndex']) {
        const index: number = parseInt(event.target.dataset['columnIndex']);
        setDragColumnWidth(columnWidthList[index]);
        setDragStartX(event.clientX);
        event.dataTransfer.effectAllowed = 'none';
        if (transparentImageRef.current) {
          event.dataTransfer.setDragImage(transparentImageRef.current, 0, 0);
        }
      }
    },
    [columnWidthList],
  );
  const onDrag = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      const { clientX } = event;
      if (clientX > 0 && event.target instanceof HTMLDivElement && event.target.dataset['columnIndex']) {
        const index: number = parseInt(event.target.dataset['columnIndex']);
        updateColumnWidth(index, dragColumnWidth + (clientX - dragStartX));
      }
    },
    [updateColumnWidth, dragColumnWidth, dragStartX],
  );

  return (
    <div className={styles.container} onDragStart={onDragStart} onDrag={onDrag}>
      {children}
      <img
        className={styles.dragIcon}
        ref={transparentImageRef}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      />
    </div>
  );
};
