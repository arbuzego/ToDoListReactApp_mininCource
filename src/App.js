import React, {useEffect} from 'react'
import ToDoList from './compnents/ToDoList'
import Context from './context'
import Loader from './compnents/Loader'
import Modal from './Modal/Modal'

const AddToDo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./compnents/AddToDo'))
  },3000)
}))

function App() {
const [todos, setTodos] = React.useState([])
const [loading, setLoading] = React.useState(true)

useEffect(() =>  {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(todos => {
      setTimeout(() => {
        setTodos(todos)
        setLoading(false)
      },2000)
    })
}, [])

function toggleTodo(id) {
  setTodos(
    todos.map(todo => {
    if(todo.id===id) {
      todo.completed=!todo.completed
    }
    return todo
  })
  )
}

function removeTodo(id){
  setTodos(todos.filter(todo => todo.id !== id))
}

function addTodo(title){
  setTodos(todos.concat([
    {
      title:title,
      id: Date.now(),
      completed: false
    }
]))
}

  return (
    <Context.Provider value={{removeTodo}}>
      <div className='wrapper'>
        <h1>Список дел на сегодня:</h1>
        <Modal />
        <React.Suspense fallback={<p>Загрузка.....</p>}>
          <AddToDo onCreate={addTodo}/>
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <ToDoList todos={todos} onToggle={toggleTodo}/>
          ) : (
            loading ? null : <p>Дел больше нет</p>
          )}
      </div>
    </Context.Provider>
    
  );
}

export default App;
