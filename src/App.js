import sun from './images/icon-sun.svg'
import moon from './images/icon-moon.svg'
import { useState, useEffect } from 'react';
import CreateList from './components/CreateList';
import TodoLists from './components/todoLists/TodoLists';

const initialList = [
  {
    _id: '5fd6260bb44cf23bc7bbaf40',
    status: 'completed',
    content:'Completed Online Javascript Course'
  },
  {
    _id: '5fd6260b632e531db298f4e8',
    status: 'completed',
    content:'Jog around the park'
  },
  {
    _id: '5fd6260b4d655ad05e6a9efb',
    status: 'active',
    content:'10 minutes meditation'
  },
  {
    _id: '5fd6260b33daddae6f6e2b5c',
    status: 'active',
    content:'Read for 1 hour'
  },
  {
    _id: '5fd6260bdde42c5841c51550',
    status: 'completed',
    content:'Pick up groceries'
  },
  {
    _id: '5fd6260b35541249f0099d30',
    status: 'active',
    content:'Completed Todo App on Frontend Mentor'
}]
const statusArray = ['all','active','completed']
function App() {
  const [theme, settheme] = useState('light');
  const [todoLists, setList] = useState(initialList);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredList, setFilteredList] = useState(todoLists) ;

  document.body.className = "theme-" + theme;
  const changeTheme = (currentTheme) => {
    let theme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = "theme-" + theme;
    settheme(theme)
  }
  const changeStatus = (currentItem) => {
    let id = currentItem._id;
    let currentList = [...todoLists];
    currentList.forEach(item=>{
      if(item._id === id){
        item.status = currentItem.status;
      }
    });
    setList(currentList);
  }
  const removeItem = (index)=>{
    let currentList = [...todoLists];
    let newList = currentList.slice(0, index).concat(currentList.slice(index + 1));
    setList(newList);
  }
  const createListItem = (item)=>{
    let currentList = [...todoLists];
    currentList.unshift(item);
    setList(currentList);
    
  }
  const clearCompleted = ()=>{
    let currentList = [...todoLists];
    let newList = currentList.filter(item=>item.status==='active');
    setList(newList);
  }
  const filterList=(type, lists)=>{
    let currentTodo = lists || todoLists
    setActiveFilter(type);
    let afterFilter= currentTodo.filter(item=>{
      if(type==='all'){
        return item;
      }
      return item.status===type;
    });
    setFilteredList(afterFilter);
  }
  const onSortEnd = ({oldIndex, newIndex}) => {
    let currentList = [...todoLists];
    let a = currentList[oldIndex], b = currentList[newIndex];
    currentList[newIndex] = a;
    currentList[oldIndex] = b;
    setList(currentList);
  };
  useEffect(() => {
    filterList(activeFilter, todoLists);
  }, [todoLists]);
  return (
    <div className={`app`} >
      <div className='container pt-5'>
        <div className="d-flex pb-4 pt-5">
          <h3 className='text-white'>TODO</h3>
          <div className="ml-auto pt-1">
            <img 
              className="themeSwitch" 
              onClick={(e) => changeTheme(theme)} src={theme === 'dark' ? sun : moon} 
              alt="" 
            />
          </div>
        </div>
        <CreateList createListItem = {createListItem} />
        <TodoLists
          filteredList={filteredList}
          actionTodo={changeStatus}
          removeItem = {removeItem}
          filterList={filterList}
          statusArray={statusArray}
          activeFilter = {activeFilter}
          todoLists = {todoLists}
          clearCompleted = {clearCompleted}
          onSortEnd = {onSortEnd}
        />
        <h3 className='text-center mt-3 footerText' style={{fontSize:'14px'}}>Drag and drop to reorder list</h3>
      </div>
    </div>
  );
}

export default App;
