import {Task} from "./Task.ts";

export interface TodoListProps {
    tasks: Task[];
    toggleComplete: (id: number) => void;
    deleteTask: (id: number) => void;
}