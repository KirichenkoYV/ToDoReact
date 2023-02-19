import React, { useState } from "react";

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

  function changeChecked(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    if (event.target.checked) {
      onDone(id);
    }
  }

  return (
    <div className={styles.OneTask}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={changeChecked}
        ></input>
        <h3 className="OneTaskTitles">{title}</h3>
        <button
          aria-aria-label="Edit"
          className={styles.OneTaskEdit}
        //   onClick={}
        ></button>
        <button
          aria-aria-label="Removed"
          className={styles.OneTaskRemoved}
          onClick={() => {
            onRemoved(id);
          }}
        ></button>
      </label>
    </div>
  );
}

export default OneTask;
