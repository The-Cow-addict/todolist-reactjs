import React, { useEffect, useState } from 'react'
import './styles.css'
import NewTodoForm from './NewTodoForm'
import TodoList from './TodoList'

export default function App() {
  
  //usestate initial value using a fat arrow function that gets 
  //data from the local storage
  const [todos, settodos] = useState(() => {
    const localValue = localStorage.getItem("ITEM")
    if(localValue == null){
      return []
    }
    else{
      //parse turns a json string to an object
      return JSON.parse(localValue)
    }
  })

  //essentially setup as a listener to "todos"
  //taking effect when "todos" have changed and 
  //stringified into json and stored into local storage
  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos))
  }, [todos])

  console.log(todos)

  function toggleTodo(id, completed) {
    //this function sets the selected list to check marked or "completed"
    settodos(currentTodos => currentTodos.map(todo => { //the mapping pulls out each individual element and 
      if(todo.id === id) {                              //matches id
        return {...todo, completed}                     //sets the state of the same id to completed
      }
      else {
        return todo
      }
    }))
  }

  function addTodo(title) {
    settodos((currentTodos) =>{
        return[
          //this creats a new set of current todos object array
          //at the front of the new object array
        ...currentTodos, 
        //this is where the new object comes into the array
        {
           id : crypto.randomUUID(), //giving object with randomised id
           title,
           completed : false //setting the default state of the completing of
          }                  //to false
        ]
      })
  }

  function deleteTodo(id) {
    settodos(currentTodos => {
      return currentTodos.filter(todo => todo.id != id) //returns a new array without the id
    })                                                  //that matches
  }

  return (
    <>
      <NewTodoForm submit={addTodo}/>
      <h1 className='header'>Todo list</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}
