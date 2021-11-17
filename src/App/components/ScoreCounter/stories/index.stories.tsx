import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FullSizeBlock } from '../../FullSizeBlock';
import { defaultProps } from '../constants';
import { ScoreCounterProps } from '../types';
import { ScoreCounter as ScoreCounterView } from '..';
import styles from './index.module.scss';

export const ScoreCounter: Story<ScoreCounterProps> = (props) => (
  <FullSizeBlock className={styles.mainWrap} absolute>
    <div className={styles.wrap}>
      <ScoreCounterView {...props} />
    </div>
  </FullSizeBlock>
);

ScoreCounter.args = defaultProps;

export default {
  title: 'Components/Score Counter',
} as Meta;