import React from 'react';
import cn from 'classnames';
import classes from './index.module.scss';
import { CellProps } from './types';
import { useCombinedRefs } from 'src/App/shared/useCombinedRefs';

export const Cell = React.forwardRef<HTMLDivElement, CellProps>(function Cell(props, ref){
    const {children, isFilled = false, isHovered = false } = props;
    const combinedRef = useCombinedRefs(ref);
    return(
        <div className={cn(classes.cell, isHovered && classes.cell_hovered)} ref={combinedRef}>
            {isFilled && children}
        </div>
    );
})