import React from "react";
import classes from "./index.module.scss";
import cn from "classnames";
import { FieldProps } from "./type";

export const Field = function (props: FieldProps) {
  const { isDisabled, children, ...otherProps } = props;

  return (
    <div {...otherProps} className={cn(classes.field, isDisabled && classes.field_disabled)}>
      <div className={classes.cells}>
        {children}
      </div>
    </div>
  );
};
