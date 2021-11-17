import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FullSizeBlock } from '../../FullSizeBlock';
import { defaultProps } from '../constants';
import { CubeProps } from '../types';
import { Cube as CubeView } from '..';
import styles from './index.module.scss';

export const Cube: Story<CubeProps> = (props) => (
  <FullSizeBlock className={styles.mainWrap} absolute>
    <div className={styles.wrap}>
      <CubeView {...props} />
    </div>
  </FullSizeBlock>
);

Cube.args = {
  ...defaultProps,
  children: 'А',
};

export default {
  title: 'Components/Cube',
} as Meta;