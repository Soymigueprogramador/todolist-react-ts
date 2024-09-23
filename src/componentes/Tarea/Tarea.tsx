type Tarea = {
  tarea: string
  borrarTarea: () => void
}

const Tarea = ({tarea,borrarTarea}: Tarea) => {
return (
  <div className="task">
      <span>{tarea}</span>
      <button onClick={borrarTarea}>Borrar</button>
  </div>
)
}

export default Tarea;