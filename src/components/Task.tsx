import { Check, Trash } from 'phosphor-react'
import styles from './Task.module.css'
import { ChangeEvent } from 'react'
import { ITodo } from './Board'

interface ITaskProps {
  content: string
  id: number
  checked: boolean
  onDeleteTodo: (id: number) => void
  onChangeChecked: (todo: ITodo) => void
}

export function Task({ content, id, checked, onDeleteTodo, onChangeChecked }: ITaskProps) {

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeChecked({
      content,
      id,
      checked: e.target.checked
    })
  }

  const handleDeleteTodo = (idTodo: number) => {
    onDeleteTodo(idTodo)
  }

  return (
    <div className={styles.task}>

      <form>
        <input
          type="checkbox"
          id={id.toString()}
          value={id}
          onChange={handleChecked}
        />

        <label className={styles.radioIcon} htmlFor={id.toString()}>
          <Check weight="bold" size={12} />
        </label>
      </form>
      <div className={checked ? styles.contentChecked : styles.content}>
        {content}
      </div>
      <div
        className={styles.btnRemove}
        onClick={() => handleDeleteTodo(id)}
      >
        <Trash weight="bold" size={16} />
      </div>
    </div>
  )
}