import cn from "classnames";
import { ButtonProps } from "./types";
import classes from "./index.module.scss";


const Button = (props: ButtonProps) => {
  const { children, className, onClick, type = "default" } = props;

  return (
    <button
      type="button"
      tabIndex={-1}
      className={cn(classes.main,classes[`main_${type}`], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
