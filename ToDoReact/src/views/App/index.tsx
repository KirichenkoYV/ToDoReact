import React, { useEffect } from "react";
import { useToDoStore } from "../../data/useToDoStore";
import styles from "./index.module.scss";
import InputPlus from "../componets/InputPlus/";

function App() {
  const [tasks, createTask, removeTask, updateTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.removeTask,
    state.updateTask,
  ]);
//   useEffect(() => {

//     createTask('dasdasad')
//   }, []);

  console.log(tasks);

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
      <section className={styles.articleSection}></section>
    </article>
  );
}

export default App;
