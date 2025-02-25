import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createTodo, removeTodo, updateTodo } from './slice/todosSlice';
import MessagesToast from './component/MessagesToast';
import { createAsyncMessage } from './slice/messagesSlice';

const initState = {
  id: '',
  text: '',
};

function App() {
   const todos = useSelector( state => {
    return state.todos
   })
   const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState(''); 
  const [editState, setEditState] = useState(initState)

  function addTodo() {
    //console.log('cre',createTodo(1234))
    if (newTodoText !== '') {
      dispatch(createTodo({
        id: new Date().getTime(),
        text: newTodoText,
      }))
      dispatch(createAsyncMessage({
        id: new Date().getTime(),
        type: 'success',
        title: '成功',
        text: '新增成功'
      }))
      setNewTodoText('');
    } else {
      dispatch(createAsyncMessage({
        id: new Date().getTime(),
        type: 'danger',
        title: '失敗',
        text: '新增失敗，請先填寫內容'
      }))
    }
    
  }

  const editTodo = (e) => {
    setEditState({
      ...editState,
      text: e.target.value,
    });
  }

  const saveEdit = (id) => {
    dispatch(updateTodo({
      id,
      text: editState.text,
    }))
    dispatch(createAsyncMessage({
      id: new Date().getTime(),
      type: 'success',
      title: '成功',
      text: '儲存成功'
    }))
    setEditState(initState);
  }
  const cancelEdit = () => {
    setEditState(initState);
  }

  const deleteTodo = (id) => {
    dispatch(removeTodo(id))
    dispatch(createAsyncMessage({
      id: new Date().getTime(),
      type: 'danger',
      title: '刪除成功',
      text: '已刪除待辦事項'
    }))
  }

  return (<>
    <MessagesToast />
    <div className='container py-5 '
      style={{maxWidth: '500px'}}>
      <h2>React redux Toolkit Practice</h2>
      <small>To Do List</small>
      <div className='d-flex mt-1'>
        <input type='text' value={newTodoText} className='form-control me-2'
          placeholder='輸入待辦事項'
          onChange={(e) => setNewTodoText(e.target.value) }/>
        <button type='button' 
          className='btn btn-primary'
          style={{ width: '80px'}}
          onClick={() => addTodo()}>
          新增
        </button>
      </div>
      <h5 className='mt-5'>待辦清單</h5>
      <ul className='nav d-flex flex-column border-top'>
        {todos.map((todo) => (
          <li key={todo.id} className='border-bottom py-2'>
            {todo.id !== editState.id && (
              <div className='d-flex '>
                <span className='flex-fill align-self-center me-2'>{todo.text}</span>
                <div className='btn-group'>
                  <button
                    type='button'
                    style={{ width: '80px'}}
                    className='btn btn-outline-primary'
                    onClick={() => {
                      setEditState({
                        text: todo.text,
                        id: todo.id,
                      });
                    }}
                  >
                    編輯
                  </button>
                  <button
                    type='button'
                    style={{ width: '80px'}}
                    className='btn btn-outline-danger'
                    onClick={() => {
                      deleteTodo(todo.id);
                    }}
                  >
                    刪除
                  </button>
                </div>
                
              </div>
            )}
            {todo.id === editState.id && (
              <div className='d-flex '>
                <input
                  type='text'
                  value={editState.text}
                  className='form-control me-2'
                  onChange={(e) => editTodo(e)}
                />
                <div className='btn-group'>
                  <button type='button' 
                    className='btn btn-success'
                    style={{ width: '80px'}}
                    onClick={() => saveEdit(todo.id)}>
                    儲存
                  </button>
                  <button type='button' 
                    className='btn btn-danger'
                    style={{ width: '80px'}}
                    onClick={() => cancelEdit()}>
                    取消
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </>)
}

export default App
