import React from "react";
import { Meta, Story } from "@storybook/react";
import { FullSizeBlock } from "../../FullSizeBlock";
import { ButtonProps } from "../types";
import { Button as ButtonView } from "..";
import styles from "./index.module.scss";

export const Button: Story<ButtonProps> = (props) => (
  <FullSizeBlock className={styles.mainWrap} absolute>
    <ButtonView {...props}>{"TextTextTextText"}</ButtonView>
  </FullSizeBlock>
);

Button.args = {
  type: "continue",
};

Button.argTypes = {
  type: {
    control: "inline-radio",
    options: ["continue", "break", "default"]
  },
};

export default {
  title: "Components/Button",
} as Meta;
