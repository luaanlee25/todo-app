import TodoItem from './TodoItem';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    tasks: Task[];
    toggleComplete: (id: number) => void;
    deleteTask: (id: number) => void;
}

function TodoList({ tasks, toggleComplete, deleteTask }: TodoListProps): JSX.Element {
    return (
        <ul>
            {tasks.map((task) => (
                <TodoItem
                    key={task.id}
                    task={task}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                />
            ))}
        </ul>
    );
}

export default TodoList;
