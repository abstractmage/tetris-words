import React from 'react';
import { Meta, Story } from '@storybook/react';
import { values } from 'lodash';
import { FullSizeBlock } from '../../FullSizeBlock';
import { defaultProps, types } from '../constants';
import { FigureProps } from '../types';
import { Figure as FigureView } from '..';
import styles from './index.module.scss';
import { Cube } from '../../Cube';

export const Figure: Story<FigureProps> = (props) => (
  <FullSizeBlock className={styles.mainWrap} absolute>
    <div className={styles.wrap}>
      <FigureView {...props}>
        <Cube>А</Cube>
        <Cube>Б</Cube>
      </FigureView>
    </div>
  </FullSizeBlock>
);

Figure.args = defaultProps;

Figure.argTypes = {
  type: {
    control: 'inline-radio',
    options: values(types),
  },
};

export default {
  title: 'Components/Figure',
} as Meta;