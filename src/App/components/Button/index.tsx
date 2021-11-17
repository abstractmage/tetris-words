import cn from "classnames";
import { ButtonProps } from "./types";
import classes from "./index.module.scss";
import { ReactComponent as CrossSvg } from "./img/cross.svg";
import { ReactComponent as ArrowSvg } from "./img/arrow.svg";

const ImageMap = {
  continue: ArrowSvg,
  break: CrossSvg,
  default: null,
};

const Button = (props: ButtonProps) => {
  const { children, className, onClick, type = "default" } = props;
  const Image = ImageMap[type];
  return (
    <button
      type="button"
      tabIndex={-1}
      className={cn(classes.main,classes[`main_${type}`], className)}
      onClick={onClick}
    >
      {Image && (
        <div className={cn(classes.image, classes[`image_${type}`])}>
          <Image />
        </div>
      )}
      {type === 'default' && children}
    </button>
  );
};

export { Button };
