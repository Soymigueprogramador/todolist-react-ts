import TareaItem from '../Tarea/Tarea.tsx';
import type { Tarea } from '../TodoApp/TodoApp.tsx';

type ListaTareas = {
    listaTareas: Tarea[];
    borrarTarea: (id: string) => void;
    alternarTarea: (id: string) => void;
}

const ListaTareas = ({ listaTareas, borrarTarea, alternarTarea }: ListaTareas) => {
    if (listaTareas.length === 0) {
        return (
            <div className="empty-state">
                <strong>No hay tareas para mostrar</strong>
                <span>Agrega una nueva tarea o cambia el filtro activo.</span>
            </div>
        );
    }

    return (
        <ul className="task-list">
            {listaTareas.map((tarea) => (
                <TareaItem
                    key={tarea.id}
                    tarea={tarea}
                    borrarTarea={() => borrarTarea(tarea.id)}
                    alternarTarea={() => alternarTarea(tarea.id)}
                />
            ))}
        </ul>
    );
}

export default ListaTareas;
