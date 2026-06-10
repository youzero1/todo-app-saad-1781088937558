import { useTodos } from './hooks/useTodos';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-brand tracking-tight drop-shadow-sm">
            ✅ My Todos
          </h1>
          <p className="mt-2 text-gray-500 text-sm">Stay organized, stay productive.</p>
        </div>

        {/* Add Todo */}
        <AddTodoForm onAdd={addTodo} />

        {/* Stats */}
        <StatsBar activeCount={activeCount} completedCount={completedCount} />

        {/* Filter Bar */}
        <FilterBar filter={filter} setFilter={setFilter} onClearCompleted={clearCompleted} completedCount={completedCount} />

        {/* Todo List */}
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />

        {filteredTodos.length === 0 && (
          <div className="mt-10 text-center text-gray-400 text-sm select-none">
            {filter === 'completed' ? 'No completed tasks yet.' : filter === 'active' ? 'No active tasks. Great job! 🎉' : 'Add your first task above!'}
          </div>
        )}
      </div>
    </div>
  );
}
