import { FormEvent, useEffect, useMemo, useState } from 'react';
import ListaTareas from '../Tareas/ListaTareas.tsx';

export type Tarea = {
    id: string;
    texto: string;
    completada: boolean;
};

type Filtro = 'todas' | 'pendientes' | 'completadas';

const STORAGE_KEY = 'todo-app-tareas';

const tareasIniciales: Tarea[] = [
    { id: crypto.randomUUID(), texto: 'Revisar prioridades del dia', completada: false },
    { id: crypto.randomUUID(), texto: 'Cerrar una tarea importante', completada: true },
];

const TodoApp = () => {
    const [nuevaTarea, setNuevaTarea] = useState('');
    const [listaTareas, setListaTareas] = useState<Tarea[]>(() => {
        const tareasGuardadas = localStorage.getItem(STORAGE_KEY);

        if (!tareasGuardadas) {
            return tareasIniciales;
        }

        try {
            return JSON.parse(tareasGuardadas) as Tarea[];
        } catch {
            return tareasIniciales;
        }
    });
    const [filtro, setFiltro] = useState<Filtro>('todas');

    const tareasPendientes = listaTareas.filter((tarea) => !tarea.completada).length;
    const tareasCompletadas = listaTareas.length - tareasPendientes;

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listaTareas));
    }, [listaTareas]);

    const tareasFiltradas = useMemo(() => {
        if (filtro === 'pendientes') {
            return listaTareas.filter((tarea) => !tarea.completada);
        }

        if (filtro === 'completadas') {
            return listaTareas.filter((tarea) => tarea.completada);
        }

        return listaTareas;
    }, [filtro, listaTareas]);

    const handleAgregarTarea = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const texto = nuevaTarea.trim();
        if (!texto) return;

        setListaTareas((tareasAnteriores) => [
            {
                id: crypto.randomUUID(),
                texto,
                completada: false,
            },
            ...tareasAnteriores,
        ]);
        setNuevaTarea('');
    };

    const handleBorrarTarea = (id: string) => {
        setListaTareas((tareas) => tareas.filter((tarea) => tarea.id !== id));
    };

    const handleAlternarTarea = (id: string) => {
        setListaTareas((tareas) =>
            tareas.map((tarea) =>
                tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea,
            ),
        );
    };

    return (
        <main className="app-shell">
            <section className="todo-panel" aria-labelledby="todo-title">
                <div className="todo-header">
                    <div>
                        <span className="eyebrow">Panel diario</span>
                        <h1 id="todo-title">Lista de tareas</h1>
                    </div>
                    <div className="task-summary" aria-label="Resumen de tareas">
                        <strong>{tareasPendientes}</strong>
                        <span>pendientes</span>
                    </div>
                </div>

                <form className="task-form" onSubmit={handleAgregarTarea}>
                    <label htmlFor="task-input">Nueva tarea</label>
                    <div className="task-input-row">
                        <input
                            id="task-input"
                            type="text"
                            value={nuevaTarea}
                            onChange={(event) => setNuevaTarea(event.target.value)}
                            placeholder="Ej: Preparar entrega del proyecto"
                        />
                        <button type="submit">Agregar</button>
                    </div>
                </form>

                <div className="toolbar" aria-label="Filtros de tareas">
                    {(['todas', 'pendientes', 'completadas'] as Filtro[]).map((opcion) => (
                        <button
                            key={opcion}
                            type="button"
                            className={filtro === opcion ? 'active' : ''}
                            onClick={() => setFiltro(opcion)}
                        >
                            {opcion}
                        </button>
                    ))}
                </div>

                <ListaTareas
                    listaTareas={tareasFiltradas}
                    borrarTarea={handleBorrarTarea}
                    alternarTarea={handleAlternarTarea}
                />

                <footer className="todo-footer">
                    <span>{listaTareas.length} tareas creadas</span>
                    <span>{tareasCompletadas} completadas</span>
                </footer>
            </section>
        </main>
    );
};

export default TodoApp;
