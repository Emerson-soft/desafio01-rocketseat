import { PlusCircle } from 'phosphor-react'
import styles from './Board.module.css'
import { Task } from './Task'
import { ChangeEvent, FormEvent, useState } from 'react'
import { NoContent } from './NoContent'

export interface ITodo {
  id: number
  checked: boolean
  content: string
}

export function Board() {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [content, setContent] = useState('')

  const handleCreateTodo = (event: FormEvent ) => {
    event.preventDefault()
    const newTodo: ITodo = {
      id: todos.length + 1,
      checked: false,
      content
    }
    setTodos([...todos, newTodo])
    setContent('')
  }

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  const onDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const onChangeChecked = ({ id, checked}: ITodo) => {    
    const index = todos.findIndex((todo) => todo.id === id)
    if (index === -1) return

    const newTodos = [...todos]    
    newTodos[index].checked = checked
   
    setTodos(newTodos)
  }

  const totalTodos = todos.length
  const todosFinish = todos.reduce((acc, current) => {
    if (current.checked) return acc + 1
    return acc
  }, 0)
  
  const mensagemTodosFinish = todosFinish > 0 ? `${todosFinish} de ${totalTodos}` : 0

  return (
    <main className={styles.board}>      
      <form onSubmit={handleCreateTodo}>      
        <input 
          placeholder='Adicione uma nova tarefa' 
          value={content}
          required
          onChange={onChangeContent}
        />

        <button type="submit" >
          Criar 
          <PlusCircle 
           size={20} 
           color='#F2F2F2'
           weight="bold"
          />
        </button>
      </form>      

      <header>
        <div className={styles.cretedTask}>
          <strong>Tarefas criadas</strong>
          <div className={styles.cicle}><span>{totalTodos}</span></div>
        </div>
        <div className={styles.taskFinish}>
          <strong>Concluídas</strong>
          <div className={styles.tag}>
            <span>{mensagemTodosFinish}</span>
          </div>
        </div>
      </header>

      <div className={styles.tasks}>
        <>
          {
            todos.length > 0 && (
              todos.map((todo) => (
                <Task 
                  content={todo.content} 
                  id={todo.id}
                  checked={todo.checked}
                  key={todo.id}
                  onDeleteTodo={onDeleteTodo}
                  onChangeChecked={onChangeChecked}
                />
              ))
            )
          }

          {
            todos.length === 0 && (
              <NoContent />
            )
          }
        </>
             
      </div>

    </main>
  )
}