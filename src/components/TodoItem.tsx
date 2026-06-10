import { useState, useRef, useEffect } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '../types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <li
      className={clsx(
        'group flex items-center gap-3 bg-white rounded-2xl shadow px-4 py-3 transition-all duration-200 border-l-4',
        todo.completed ? 'opacity-60' : 'opacity-100'
      )}
      style={{ borderLeftColor: todo.priority === 'high' ? '#f87171' : todo.priority === 'medium' ? '#fbbf24' : '#34d399' }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-brand border-brand text-white'
            : 'border-gray-300 hover:border-brand'
        )}
        aria-label="Toggle todo"
      >
        {todo.completed && <Check size={12} strokeWidth={3} />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border-b-2 border-brand outline-none text-sm bg-transparent py-0.5"
          />
        ) : (
          <span
            className={clsx(
              'text-sm block truncate',
              todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
            )}
          >
            {todo.text}
          </span>
        )}
        <span className={clsx('text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block', PRIORITY_BADGE[todo.priority])}>
          {todo.priority}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 transition"
              aria-label="Save"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cancel"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-brand hover:bg-indigo-50 transition"
              aria-label="Edit"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition"
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
