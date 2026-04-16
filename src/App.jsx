import { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    const res = await axios.get(`${API}/api/todos`)
    setTodos(res.data)
  }

  const addTodo = async () => {
    if (!input.trim()) return
    await axios.post(`${API}/api/todos`, { title: input })
    setInput('')
    fetchTodos()
  }

  const toggleTodo = async (id) => {
    await axios.patch(`${API}/api/todos/${id}`)
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/api/todos/${id}`)
    fetchTodos()
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>📝 Todo List</h1>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a task..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Add
        </button>
      </div>

      {todos.map(todo => (
        <div key={todo.id} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '10px', marginBottom: '8px',
          border: '1px solid #ddd', borderRadius: '6px'
        }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span style={{
            flex: 1,
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? '#999' : '#000'
          }}>
            {todo.title}
          </span>
          <button onClick={() => deleteTodo(todo.id)} style={{ cursor: 'pointer' }}>
            🗑️
          </button>
        </div>
      ))}

      {todos.length === 0 && <p style={{ color: '#999' }}>No tasks yet!</p>}
    </div>
  )
}

export default App