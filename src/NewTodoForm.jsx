import React, { useState } from 'react'

export default function NewTodoForm({submit}) {
    const [newItem, setnewItem] = useState('')

    function handleSubmit(e){
        e.preventDefault()

        if(newItem === "") return
    
        submit(newItem)
    
        setnewItem("")
      }


  return (
    <div>
        <form className='new-item-form' onSubmit={handleSubmit}>
        <div className='form-row'>
        <label htmlFor='item'>New item</label>
          <input type='text' id='item' value={newItem} onChange={e => setnewItem(e.target.value)}/>
        </div>
        <button className='btn'>Add</button>
      </form>
    </div>
  )
}

