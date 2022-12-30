import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "./toggle.module.scss";

interface ToggleProps {
  className?: string;
  toggleID: string;
  label?: string;
  checked?: boolean;
  toggleText?: string;
  handleChange: (newStatus: boolean) => void;
}

export const Toggle = ({ checked = false, ...props }: ToggleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.checked = checked;
    }
  }, [checked]);

  const handleClick = () => {
    if (inputRef && inputRef.current) {
      props.handleChange(!inputRef.current.checked);
    }
  };

  return (
    <div
      className={classNames(props.className, styles.toggle)}
      onClick={handleClick}
    >
      <input
        id={props.toggleID}
        type="checkbox"
        ref={inputRef}
        className={classNames(styles.input)}
      />
      <div
        className={classNames(styles.mask, {
          [styles.checked]: checked,
        })}
      >
        <div
          className={classNames(styles.switch, {
            [styles.checked]: checked,
          })}
        >
          {props.toggleText}
        </div>
      </div>
      {props.label && <label htmlFor={props.toggleID}>{props.label}</label>}
    </div>
  );
};
