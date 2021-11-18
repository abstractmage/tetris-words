import React from 'react';
import cn from 'classnames';
import classes from './index.module.scss';
import { CellProps } from './types';

export const Cell = React.forwardRef<HTMLDivElement, CellProps>(function Cell(props, ref){
    const { isHovered = false, children, ...otherProps } = props;

    return (
        <div ref={ref} {...otherProps} className={cn(classes.cell, isHovered && classes.cell_hovered)} />
    );
})