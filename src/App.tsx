import { useState, useEffect } from 'react';
import TodoInput from './components/Todo/ToDoInput.tsx';
import TodoList from './components/Todo/ToDoList.tsx';
import {Task} from "./abstracts/Task.ts";
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer.tsx";

function App(): JSX.Element {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        document.body.classList.toggle('dark-theme', isDarkMode);
    }, [isDarkMode]);

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
        <>
            <div className="w-4/12 h-screen">
                <h1 className="text-center font-bold text-3xl pb-5">To-Do List</h1>
                <div className="switch-wrapper shadow-none">
                    <span className="theme-label text-base mr-2.5">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
                    <label className="switch">
                        <input className="hidden"
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={() => setIsDarkMode(!isDarkMode)}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
                <TodoInput addTask={addTask} />
                <TodoList
                    tasks={tasks}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                />
            </div>
            <div className="w-4/12 h-screen">
                <PomodoroTimer />
            </div>
        </>
    );
}

export default App;