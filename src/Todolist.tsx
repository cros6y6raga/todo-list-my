import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (valueTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    const mappedTasks = props.tasks.map(t => {
        const removeTaskHandler = () => {
            props.removeTask(t.id)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <Button buttonName={'x'} callBack={removeTaskHandler}/>
            </li>)
    })
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeFilterCzarHandler = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input onChange={onChangeHandler} value={title} onKeyDown={onKeyDownHandler}/>
            <Button buttonName={'+'} callBack={addTaskHandler}/>
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <Button buttonName={'All'} callBack={() => changeFilterCzarHandler('all')}/>
            <Button buttonName={'Active'} callBack={() => changeFilterCzarHandler('active')}/>
            <Button buttonName={'Completed'} callBack={() => changeFilterCzarHandler('completed')}/>
        </div>
    </div>
}