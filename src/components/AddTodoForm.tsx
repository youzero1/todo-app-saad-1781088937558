import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITY_OPTIONS: { label: string; value: Priority; color: string }[] = [
  { label: 'Low', value: 'low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { label: 'Med', value: 'medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { label: 'High', value: 'high', color: 'bg-rose-100 text-rose-700 border-rose-300' },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(text, priority);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white rounded-2xl shadow-lg p-5 mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-brand hover:bg-brand-dark disabled:opacity-40 text-white rounded-xl px-4 py-2.5 transition flex items-center gap-1.5 text-sm font-semibold shadow"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <span className="text-xs text-gray-400 mr-1">Priority:</span>
        {PRIORITY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-semibold border transition',
              opt.color,
              priority === opt.value ? 'ring-2 ring-offset-1 ring-brand scale-105' : 'opacity-60 hover:opacity-90'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </form>
  );
}
