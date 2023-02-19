import React, { useEffect } from "react";
import { useToDoStore } from "../../data/useToDoStore";
import styles from "./index.module.scss";
import InputPlus from "../componets/InputPlus/";
import OneTask from "../componets/oneTask";

function App() {
  const [tasks, createTask, removeTask, updateTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.removeTask,
    state.updateTask,
  ]);

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>Список задач:</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={(title) => {
            if (title) {
              createTask(title);
            }
          }}
        />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length ? (
          <p className={styles.articleText}>Задач нет</p>
        ) : (
          tasks.map((task) => (
            <OneTask
              key={task.id}
              id={task.id}
              title={task.title}
              onDone={removeTask}
              onEdited={updateTask}
              onRemoved={removeTask}
            />
          ))
        )}
      </section>
    </article>
  );
}

export default App;
