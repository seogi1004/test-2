import { useEffect, useState } from 'react';

interface GridViewportProperties {
  viewHeight: number;
  rowHeight: number;
  rowGap: number;
  rowCount: number;
  rowCountInView?: number;
  paddingRowCount?: number;
  skeletonRowCount?: number;
  scrollTop: number;
}

export const useGridViewport = ({
  viewHeight,
  rowHeight,
  rowGap,
  rowCount,
  rowCountInView = Math.ceil(viewHeight / (rowHeight + rowGap)),
  paddingRowCount = rowCountInView,
  skeletonRowCount = rowCountInView,
  scrollTop,
}: GridViewportProperties) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(Math.floor(scrollTop / (rowHeight + rowGap)));
  }, [rowGap, rowHeight, scrollTop]);

  const [paddingRowStartIndex, setPaddingRowStartIndex] = useState(-paddingRowCount);
  const [paddingRowEndIndex, setPaddingRowEndIndex] = useState(rowCountInView + paddingRowCount);

  const [skeletonRowStartIndex, setSkeletonRowStartIndex] = useState(paddingRowStartIndex - skeletonRowCount);
  const [skeletonRowEndIndex, setSkeletonRowEndIndex] = useState(paddingRowEndIndex + skeletonRowCount);

  useEffect(() => {
    const paddingRowStartIndex: number = currentIndex - paddingRowCount;
    const paddingRowEndIndex: number = currentIndex + rowCountInView + paddingRowCount;

    setPaddingRowStartIndex(paddingRowStartIndex);
    setPaddingRowEndIndex(paddingRowEndIndex);

    setSkeletonRowStartIndex(paddingRowStartIndex - skeletonRowCount);
    setSkeletonRowEndIndex(paddingRowEndIndex + skeletonRowCount);
  }, [currentIndex, paddingRowCount, rowCountInView, skeletonRowCount]);

  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportY, setViewportY] = useState(0);

  useEffect(() => {
    const height: number =
      rowHeight * (rowCount - paddingRowStartIndex) + rowGap * (rowCount - paddingRowStartIndex - 1);
    setViewportHeight(height);

    const y: number =
      scrollTop -
      Math.min(currentIndex, paddingRowCount + skeletonRowCount) * (rowHeight + rowGap) -
      (scrollTop % (rowHeight + rowGap));
    setViewportY(y);
  }, [currentIndex, paddingRowCount, paddingRowStartIndex, rowCount, rowGap, rowHeight, scrollTop, skeletonRowCount]);

  return {
    rowCountInView,
    currentIndex,
    paddingRowStartIndex,
    paddingRowEndIndex,
    skeletonRowStartIndex,
    skeletonRowEndIndex,
    viewportHeight,
    viewportY,
  };
};
