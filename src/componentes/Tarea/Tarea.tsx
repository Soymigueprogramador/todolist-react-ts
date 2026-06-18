import type { Tarea } from '../TodoApp/TodoApp.tsx';

type TareaItemProps = {
  tarea: Tarea;
  borrarTarea: () => void;
  alternarTarea: () => void;
}

const TareaItem = ({ tarea, borrarTarea, alternarTarea }: TareaItemProps) => {
  return (
    <li className={`task ${tarea.completada ? 'completed' : ''}`}>
      <label className="task-check">
        <input
          type="checkbox"
          checked={tarea.completada}
          onChange={alternarTarea}
          aria-label={`Marcar ${tarea.texto} como ${tarea.completada ? 'pendiente' : 'completada'}`}
        />
        <span>{tarea.texto}</span>
      </label>
      <button type="button" onClick={borrarTarea} aria-label={`Borrar ${tarea.texto}`}>
        Borrar
      </button>
    </li>
  );
}

export default TareaItem;
