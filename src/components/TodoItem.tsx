interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    task: Task;
    toggleComplete: (id: number) => void;
    deleteTask: (id: number) => void;
}

function TodoItem({ task, toggleComplete, deleteTask }: TodoItemProps): JSX.Element {
    return (
        <li>
      <span
          className={task.completed ? 'completed' : ''}
      >
        {task.text}
      </span>
            <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;
