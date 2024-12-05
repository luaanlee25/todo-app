import TodoItem from './TodoItem.tsx';
import {TodoListProps} from "../../abstracts/TodoList.ts";

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
