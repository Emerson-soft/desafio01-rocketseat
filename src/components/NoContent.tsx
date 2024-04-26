import styles from './NoContent.module.css'
import Clipboard from '../assets/Clipboard.svg'

export function NoContent() {
  return (
    <div className={styles.noContent}>
      <img src={Clipboard} alt="icone clipboard" />
      <p>Você ainda não tem tarefas cadastradas</p>
      <span>Crie tarefas e organize seus itens a fazer</span>
    </div>
  )
}