import React from 'react';
import { Meta, Story } from '@storybook/react';
import { CellProps } from '../types';
import { Cell as CellView } from '..';
import styles from './index.module.scss';
import { FullSizeBlock } from '../../FullSizeBlock';
import { Cube } from '../../Cube';
import { colors } from '../../Cube/constants';

export const Cell: Story<CellProps> = (props) => (
  <FullSizeBlock className={styles.mainWrap} absolute>
    <div className={styles.wrap}>
      <CellView {...props} >
        <Cube color={colors["#0ABA9A"]} clickable={false}>A</Cube>
      </CellView>
    </div>
  </FullSizeBlock>
);

Cell.args = {
  isFilled: true
};

export default {
  title: 'Components/Cell',
} as Meta;