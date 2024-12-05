import {useState} from "react";
import {ToDoInputProps} from "../../abstracts/TodoInput.ts";

export default function ToDoInput({addTask} : ToDoInputProps) {
    const [input, setInput] = useState('');

    function handleAdd(){
        if (input.trim()){
            setInput('');
            addTask(input);
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <input type="text" value={input} placeholder="Add a task" onChange={e => setInput(e.target.value)}/>
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}