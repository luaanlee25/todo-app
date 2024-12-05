import {Task} from "./Task.ts";

export interface TodoItemProps {
    task: Task;
    toggleComplete: (id: number) => void;
    deleteTask: (id: number) => void;
}