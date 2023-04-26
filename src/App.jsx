import React, { useEffect, useState } from 'react'
import './styles.css'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

export default function App() {
  
  const [todos, settodos] = useState(() => {
    const localValue = localStorage.getItem("ITEM")
    if(localValue == null){
      return []
    }
    else{
      return JSON.parse(localValue)
    }
  })

  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])

  console.log(todos)

  function toggleTodo(id, completed) {
    settodos(currentTodos => currentTodos.map(todo => {
      if(todo.id === id) {
        return {...todo, completed}
      }
      else {
        return todo
      }
    }))
  }

  function addTodo(title) {
    settodos((currentTodos) =>{
        return[
        ...currentTodos, 
        {
           id : crypto.randomUUID(),
           title,
           completed : false
          }
        ]
      })
  }

  function deleteTodo(id) {
    settodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id)
    })
  }

  return (
    <>
      <NewTodoForm submit={addTodo}/>
      <h1 className='header'>Todo list</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}
