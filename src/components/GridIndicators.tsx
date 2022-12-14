import { css } from '@emotion/css';
import { FunctionComponent } from 'react';
import { GridIndicator, GridIndicatorProperties } from './GridIndicator';

interface GridIndicatorsProperties {
  indicators: GridIndicatorProperties[];
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    columnGap: '12px',
    padding: '16px',
  }),
};

export const GridIndicators: FunctionComponent<GridIndicatorsProperties> = ({ indicators }) => {
  return (
    <div className={styles.container}>
      {indicators.map(({ name, icon }: GridIndicatorProperties, index: number) => (
        <GridIndicator key={index} name={name} icon={icon} />
      ))}
    </div>
  );
};
