import create, { State, StateCreator } from "zustand";
import { generateId } from "../helper";
import { devtools } from "zustand/middleware";

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
  return "tasks" in object;
}

const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (nextState, ...args) => {
        if (isToDoStore(nextState)) {
          window.localStorage.setItem("tasks", JSON.stringify(nextState.tasks));
        }
        set(nextState, ...args);
      },
      get,
      api
    );

function getTasksLocal() {
  try {
    return JSON.parse(window.localStorage.getItem("tasks") || "[]") as Task[];
  } catch (error) {
    window.localStorage.setItem("tasks", "[]");
  }
  return [];
}

const currentState = JSON.parse(window.localStorage.getItem("tasks") || "[]");

export const useToDoStore = create<ToDoStore>(
  localStorageUpdate(
    devtools((set, get) => ({
      tasks: getTasksLocal(),
      createTask: (title: string) => {
        const { tasks } = get();
        const newTasks = { id: generateId(), title, createdAt: Date.now() };
        set({
          tasks: [newTasks].concat(tasks),
        });
      },
      updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.map((task) => ({
            ...tasks,
            title: task.id === id ? title : task.title,
          })),
        });
      },
      removeTask: (id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.filter((task) => task.id !== id),
        });
      },
    }))
  )
);
