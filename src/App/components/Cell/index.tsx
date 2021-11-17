import React from 'react';
import cn from 'classnames';
import classes from './index.module.scss';
import { CellProps } from './types';

export const Cell = function Cell(props: CellProps){
    const {children, isFilled, isHovered} = props;
    return(
        <div className={cn(classes.cell, isHovered && classes.cell_hovered)}>
            {isFilled && children}
        </div>
    );

}