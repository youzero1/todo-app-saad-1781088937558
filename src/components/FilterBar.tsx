import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import { FilterType } from '../types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({ filter, setFilter, onClearCompleted, completedCount }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow px-5 py-3 mb-4">
      <div className="flex gap-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-4 py-1.5 rounded-xl text-sm font-medium transition',
              filter === f.value
                ? 'bg-brand text-white shadow'
                : 'text-gray-500 hover:bg-gray-100'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-600 transition"
        >
          <Trash2 size={13} />
          Clear completed
        </button>
      )}
    </div>
  );
}
