"use client"

import React from 'react';
import {useTodos} from "@/store/todos";
import {useSearchParams} from "next/navigation";

const Todos = () => {
    const {todos,toggleTodoAsCompleted,handleTodoDelete} = useTodos()
    const searchParams = useSearchParams();
    const todosFilter = searchParams.get('todos')

    console.log(todos)

    let filterTodos = todos;

    if (todosFilter === "active"){
        filterTodos = filterTodos.filter((todo)=> !todo.complete)
    }else if (todosFilter === "completed"){
        filterTodos = filterTodos.filter((todo)=> todo.complete)
    }

    return (
        <ul className="main-task">
            {
                filterTodos.map((todo)=>{
                    return <li key={todo.id}>
                       <input type="checkbox" name="" id={`todo-${todo.id}`} checked={todo.complete} onChange={() => toggleTodoAsCompleted(todo.id)} />
                        <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                        {
                            todo.complete && (
                                <button type="button" onClick={()=>handleTodoDelete(todo.id)}>Delete</button>
                            )
                        }
                    </li>
                })
            }
        </ul>
    );
};

export default Todos;