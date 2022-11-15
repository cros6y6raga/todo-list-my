import React, {useState} from 'react';
import {FilteredValueType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
}

export function Todolist(props: PropsType) {
    let [filter, setFilter] = useState<FilteredValueType>('All')
    let afterFilterTask = props.tasks
    if (filter === 'Active') {
        afterFilterTask = props.tasks.filter(t => t.isDone === false)
    }
    if (filter === 'Completed') {
        afterFilterTask = props.tasks.filter(t => t.isDone === true)
    }
    const filteredTask = (value: FilteredValueType) => {
        setFilter(value)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {afterFilterTask.map((tmap) => {
                return (
                    <li key={tmap.id}><input type="checkbox" checked={tmap.isDone}/> <span>{tmap.title}</span>
                        <button onClick={() => {
                            props.removeTask(tmap.id)
                        }}>x
                        </button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={() => {
                filteredTask('All')
            }}>All
            </button>
            <button onClick={() => {
                filteredTask('Active')
            }}>Active
            </button>
            <button onClick={() => {
                filteredTask('Completed')
            }}>Completed
            </button>
        </div>
    </div>
}