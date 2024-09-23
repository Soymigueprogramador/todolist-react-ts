import Tarea from "../Tarea/Tarea.tsx"

type ListaTareas = {
    listaTareas: string[]
    borrarTarea: (index: number) => void
}

const ListaTareas = ({ listaTareas, borrarTarea }: ListaTareas) => {
    return (
        <div className="taskList">
            {listaTareas.map((tarea, index) => (
                <Tarea key={index} tarea={tarea} borrarTarea={() => borrarTarea(index)}></Tarea>
            )
            )}
        </div>
    )
}

export default ListaTareas;