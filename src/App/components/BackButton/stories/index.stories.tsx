import React from 'react';
import { Meta, Story } from '@storybook/react';
import { FullSizeBlock } from '../../FullSizeBlock';
import { defaultProps } from '../constants';
import { BackButtonProps } from '../types';
import { BackButton as BackButtonView } from '..';
import styles from './index.module.scss';

export const BackButton: Story<BackButtonProps> = (props) => (
  <FullSizeBlock className={styles.mainWrap} absolute>
    <BackButtonView {...props} />
  </FullSizeBlock>
);

BackButton.args = defaultProps;

export default {
  title: 'Components/Back Button',
} as Meta;