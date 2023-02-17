import React, { useCallback, useState } from "react";
import styles from "./index.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

function InputPlus({ onAdd }: InputPlusProps): JSX.Element {
  const [initialValue, setValue] = useState("");

  function changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const addTask = useCallback(() => {
    onAdd(initialValue);
    setValue("");
  }, [initialValue]);
  return (
    <div className={styles.InputPlus}>
      <input
        className={styles.InputPlusValue}
        type="text"
        value={initialValue}
        onChange={changeValue}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addTask();
          }
        }}
      ></input>
      <button
        className={styles.InputPlusButton}
        onClick={() => {
          addTask();
        }}
        aria-label="Add"
      ></button>
    </div>
  );
}

export default InputPlus;
