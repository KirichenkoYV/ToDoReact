import React, { useEffect } from "react";
import { useToDoStore } from "../../data/useToDoStore";
import styles from "./index.module.scss";

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
      <section className={styles.articleSection}></section>
      <section className={styles.articleSection}></section>
    </article>
  );
}

export default App;
