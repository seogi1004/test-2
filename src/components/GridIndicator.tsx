import { css } from '@emotion/css';
import { FunctionComponent } from 'react';

export interface GridIndicatorProperties {
  icon: string;
  name: string;
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: '4px',
    color: '#1C1C1C',
    fontSize: '12px',
  }),
};

export const GridIndicator: FunctionComponent<GridIndicatorProperties> = ({ icon, name }) => {
  return (
    <div className={styles.container}>
      <img src={icon} /> {name}
    </div>
  );
};
