import { useState } from 'react';
import TodoInput from './components/ToDoInput';
import TodoList from './components/ToDoList';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

function App(): JSX.Element {
    const [tasks, setTasks] = useState<Task[]>([]);

    function addTask(text: string): void {
        setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    }

    function toggleComplete(id: number): void {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    }

    function deleteTask(id: number): void {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (
        <div>
            <h1>To-Do List</h1>
            <TodoInput addTask={addTask} />
            <TodoList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
        </div>
    );
}

export default App;
