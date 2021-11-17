import React from 'react';
import cn from 'classnames';
import classes from './index.module.scss';
import { CellProps } from './types';

export const Cell = React.forwardRef<HTMLDivElement, CellProps>(function Cell(props, ref){
    const {children, isFilled = false, isHovered = false } = props;
    return(
        <div className={cn(classes.cell, isHovered && classes.cell_hovered)}  ref={ref}>
            {isFilled && children}
        </div>
    );
})