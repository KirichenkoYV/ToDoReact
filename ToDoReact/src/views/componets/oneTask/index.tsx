import React, { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

interface OneTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

function OneTask({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}: OneTaskProps): JSX.Element {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEdidMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  function changeValue() {
    setIsEdidMode(function (prev): any {
      return setIsEdidMode(!prev);
    });
  }

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  function changeChecked(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    if (event.target.checked) {
      onDone(id);
    }
  }

  return (
    <div className={styles.OneTask}>
      <div className={styles.OneTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          onChange={changeChecked}
          className={styles.OneTaskCheckbox}
          disabled={isEditMode}
        />

        {isEditMode ? (
          <input
            value={value}
            onChange={(evt) => setValue(evt.target.value)}
            className={styles.OneTaskTitleEdit}
            ref={editTitleInputRef}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onEdited(id, value);
                changeValue();
              }
            }}
          ></input>
        ) : (
          <h3 className={styles.OneTaskTitles}>{title}</h3>
        )}
      </div>

      {isEditMode ? (
        <button
          aria-label="Check"
          className={styles.OneTaskCheck}
          onClick={() => {
            onEdited(id, value);
            changeValue();
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.OneTaskEdit}
          onClick={changeValue}
        />
      )}
      <button
        aria-label="Removed"
        className={styles.OneTaskRemoved}
        onClick={() => {
          if (confirm("Вы уверены,что хотите удалить?")) {
            onRemoved(id);
          }
        }}
      />
    </div>
  );
}

export default OneTask;
