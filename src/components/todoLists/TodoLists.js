import React, { Fragment } from 'react';
import CustomCheckBox from '../customCheckbox/CustomCheckBox';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';
import cross from './../../images/icon-cross.svg';
import './style.scss';

function ListItem({ item, checkEvent, itemIndex, removeItem }) {
  const changeEvent = function (e) {
    let checked = e.target.checked;
    let currentItem = item;
    if (checked) {
      currentItem.status = 'completed'
    } else {
      currentItem.status = 'active'
    }
    checkEvent(currentItem);
  }
  return (<li className="list-group-item d-flex align-items-center pl-4 py-4">
    <CustomCheckBox
      name={`${itemIndex}-todoList`}
      labelText={item.content}
      checked={item.status === 'completed'}
      checkEvent={changeEvent}
    />
    <div className="ml-auto" onClick={(e) => removeItem(itemIndex)}>
      <img src={cross} className="pointer" alt="" />
    </div>
  </li>)
}
const SortableItem = sortableElement(ListItem);
const SortableContainer = sortableContainer(({ children }) => {
  return <ul className="todoListUl list-group shadow-lg">{children}</ul>;
});

const TodoLists = ({ filteredList, todoLists, actionTodo, removeItem, filterList, statusArray, activeFilter, clearCompleted, onSortEnd }) => {

  const countComplete = () => {
    let activeCount = todoLists.filter(item => item.status === 'active').length;
    return activeCount > 1 ? `${activeCount} items left` : `${activeCount} item left`
  }
  const changeFilter = (type) => {
    filterList(type);
  }
  return (
    <Fragment>
    <SortableContainer onSortEnd={onSortEnd} 
   
    distance={1}>
      {filteredList.map((item, index) => (
        <SortableItem
          item={item}
          itemIndex={index}
          checkEvent={actionTodo}
          key={`${item.content}-${index}`}
          removeItem={removeItem}
          index={index}
        />
      ))
      }
      <li className="list-group-item d-flex justify-content-between">
        <div>{countComplete()}</div>
        <ul className="list-inline justify-content-between d-none d-sm-flex">
          {statusArray.map((item) => (
            <li
              onClick={(e) => changeFilter(item)}
              className={`px-1 text-capitalize footerList ${activeFilter === item ? 'active' : ''}`}
              key={item}>
              {item}
            </li>))}
        </ul>
        <div
          onClick={clearCompleted}
          className="footerList">Clear Completed</div>
      </li>
    </SortableContainer>
        <ul className="list-inline d-flex justify-content-center mobile-filter py-3 my-4 d-sm-none">
          {statusArray.map((item) => (
            <li
              onClick={(e) => changeFilter(item)}
              className={`px-1 mx-2 text-capitalize footerList ${activeFilter === item ? 'active' : ''}`}
              key={item}>
              {item}
            </li>))}
        </ul>
    </Fragment>
  );
}

export default TodoLists;
