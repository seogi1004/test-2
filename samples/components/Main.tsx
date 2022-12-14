import { css } from '@emotion/css';
import { useMemo } from 'react';
import { Grid } from '../../src/components/Grid';
import { GridHeader } from '../../src/components/GridHeader';
import { GridIndicators } from '../../src/components/GridIndicators';
import { GridRows } from '../../src/components/GridRows';
import { GridProvider } from '../../src/contexts/Grid';
import CircleBlue from '../assets/icons/circle-blue.svg';
import CircleGreen from '../assets/icons/circle-green.svg';
import CirclePurple from '../assets/icons/circle-purple.svg';
import CircleYellow from '../assets/icons/circle-yellow.svg';
import data from '../data.csv';

for (const row of data) {
  row['응답시간'] = +row['응답시간'];
  row['메서드 시간'] = +row['메서드 시간'];
  row['SQL 시간'] = +row['SQL 시간'];
  row['External Call 시간'] = +row['External Call 시간'];
  row['Batch 시간'] = +row['Batch 시간'];
  row['Fetch시간'] = +row['Fetch시간'];
  row['CPU 시간'] = +row['CPU 시간'];
}

const styles = {
  container: css({
    width: '100%',
    height: '100%',
  }),
};

export const Main = () => {
  const indicators = useMemo(
    () => [
      { name: 'Method', icon: CircleGreen },
      { name: 'SQL', icon: CircleBlue },
      { name: 'External Call', icon: CircleYellow },
      { name: 'Batch job', icon: CirclePurple },
    ],
    [],
  );

  const columns = useMemo(() => {
    const columns: Column[] = [];
    let key: Column;
    for (key in data[0]) {
      columns.push(key);
    }
    return columns;
  }, []);

  const rows = useMemo(() => [...data], []);

  return (
    <div className={styles.container}>
      <GridProvider>
        <Grid>
          <GridIndicators indicators={indicators} />
          <GridHeader columns={columns} />
          <GridRows rows={rows} rowHeight={58} rowGap={8} />
        </Grid>
      </GridProvider>
    </div>
  );
};
