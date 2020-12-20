import React, {useState} from 'react';
import {randomId} from './../utility';
import CustomCheckBox from './customCheckbox/CustomCheckBox';
const initialTodoItem = {
    _id:randomId(24),
    status:'active',
    content:''
  }
const CreateList= ({createListItem})=> {
  const [toDoItem, setToDoItem] = useState(initialTodoItem);

  const updateContent = (e)=>{
    let toDo = {...toDoItem};
    toDo.content = e.target.value;
    setToDoItem(toDo);
  }
  const updateStatus = (e)=>{
    let toDo = {...toDoItem};
    toDo.status = e.target.checked?'completed':'active';
    setToDoItem(toDo);
  }
  const keyPress = (e)=>{
    if(e.keyCode === 13 && toDoItem.content.length>0){
         createListItem(toDoItem);
         setToDoItem(initialTodoItem)
      }
  }
  const createNewItem=()=>{
    createListItem(toDoItem);
    setToDoItem(initialTodoItem)
  }
  return (
    <div className="input-group createList align-items-center mb-3">
      <div className="input-group-prepend pl-4">
        <CustomCheckBox 
          name="createChecked"
          checked = {toDoItem.status==='completed'}
          checkEvent = {updateStatus}
        />
      </div>
      <input 
        type="text" 
        className="form-control createListInputText border-0" 
        aria-label="Text input with checkbox" 
        placeholder="Enter todo text"
        onChange={updateContent}
        value={toDoItem.content}
        onKeyDown={keyPress} 
      />
      {/* <button className='btn enterBtn'>Enter</button> */}
      {
        toDoItem.content.length > 0 && 
        <span 
          onClick={createNewItem}
          className="position-absolute d-flex align-items-center cursor-pointer" 
          style={{right:'22px', fontSize:'22px', zIndex:3, cursor:'pointer'}}>
          <ion-icon name="enter-outline"></ion-icon>
        </span>}
    </div>
  )
}
export default CreateList