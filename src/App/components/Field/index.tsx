import React from "react";
import classes from "./index.module.scss";
import cn from "classnames";
import { FieldProps } from "./type";

export const Field = function (props: FieldProps) {
  const { isDisabled, children } = props;
  return (
    <div className={cn(classes.field, isDisabled && classes.field_disabled)}>
        <div className={classes.cells}>
            {children}
        </div>
    </div>
  );
};
